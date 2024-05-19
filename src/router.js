import { Router } from "express";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import Category from "./models/Category.js";
import middleware from "./middleware.js";

const router = Router();

router.param("productId", middleware.validateParamsField);
router.param("categoryId", middleware.validateParamsField);

// protect all routes starting with /user, /admin, /cart
router.all(
  ["/user*", "/admin*", "/cart*"],
  middleware.checkToken,
  middleware.insertAuthPayload
);

//protect admin routes by auth0 permissions
router.post("/admin*", middleware.canAdminWrite);
router.patch("/admin*", middleware.canAdminWrite);
router.delete("/admin*", middleware.canAdminDelete);

// **********
//  PUBLIC ROUTES
// **********

// PRODUCTS ROUTES

router.get("/products/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// CATEGORY ROUTES

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/categories/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Category.findById(categoryId);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// **********
//  PROTECTED ROUTES
// **********

// USER ROUTES

router.get("/user", async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.json({ userId });
  } catch (err) {
    next(err);
  }
});

router.get("/user/info", async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

// CART ROUTES

router.get("/cart", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId })
      .populate("products.product")
      .exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/cart",
  middleware.validateBodyFields(["productId", "quantity"]),
  middleware.formatFields([["quantity", "number"]]),
  middleware.validateBodyIdsFields(["productId"]),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const product = await Product.findById(productId).exec();
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      let cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }
      const existingProduct = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
      res.send(cart);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/cart",
  middleware.validateBodyFields(["productId", "quantity"]),
  middleware.formatFields([["quantity", "number"]]),
  middleware.validateBodyIdsFields(["productId"]),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      const existingProduct = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found in cart" });
      }
      if (quantity === 0) {
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== productId
        );
      } else {
        existingProduct.quantity = quantity;
      }

      await cart.save();
      return res.send(cart);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/cart", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.products = [];
    await cart.save();
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// **********
// ADMIN ROUTES
// **********

router.post(
  "/admin/products",
  middleware.validateBodyFields([
    "name",
    "description",
    "picture",
    "price",
    "category",
  ]),
  middleware.formatFields([["price", "number"]]),
  async (req, res, next) => {
    try {
      const { name, description, picture, price, category } = req.body;

      const newProduct = new Product({
        name,
        description,
        picture,
        price,
        category,
      });
      await newProduct.save();
      res.send(newProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/admin/products/:productId",
  middleware.formatFields([["price", "number"]]),
  async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const { name, description, picture, price, category } = req.body;
      const product = await Product.findById(productId).exec();
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      product.name = name || product.name;
      product.description = description || product.description;
      product.picture = picture || product.picture;
      product.price = price || product.price;
      product.category = category || product.category;
      await product.save();
      res.send(product);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/admin/producs/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.remove();
    res.send({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

router.post("/admin/categories", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.send(newCategory);
  } catch (err) {
    next(err);
  }
});

router.patch("/admin/categories/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;
    const category = await Category.findById(categoryId).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.delete("/admin/categories/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.remove();
    res.send({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
