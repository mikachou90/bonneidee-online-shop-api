import { Router } from "express";
import middleware from "./middleware.js";
import requests from "./routes/all.js";

const router = Router();

router.param("productId", middleware.validateParamsField);
router.param("categoryId", middleware.validateParamsField);
router.param("colorId", middleware.validateParamsField);

// protect all routes starting with /user, /cart
router.all(
  ["/user*", "/cart*"],
  middleware.checkToken,
  middleware.insertAuthPayload,
);

// PRODUCTS ROUTES
router.get("/products/:productId", requests.products.getProduct);
router.get("/products", requests.products.listProducts);

// admin only
router.post(
  "/products",
  middleware.canAdminWrite,
  middleware.validateBodyFields([
    "name",
    "description",
    "picture",
    "price",
    "category",
    "colors",
  ]),
  middleware.formatFields([["price", "number"]]),
  middleware.validateBodyIdsFields(["category", "colors"]),
  requests.products.createProduct,
);
router.patch(
  "/products/:productId",
  middleware.canAdminWrite,
  middleware.formatFields([["price", "number"]]),
  requests.products.updateProduct,
);
router.delete("/producs/:productId", middleware.canAdminDelete);

// CATEGORY ROUTES
router.get("/categories", requests.categories.listCategories);
router.get("/categories/:categoryId", requests.categories.getCategory);
router.post(
  "/categories",
  middleware.canAdminWrite,
  requests.categories.createCategory,
);
router.patch(
  "/categories/:categoryId",
  middleware.canAdminWrite,
  requests.categories.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  middleware.canAdminDelete,
  requests.categories.deleteCategory,
);

// COLORS
router.get("/colors", requests.colors.listColors);
router.get("/colors/:colorId", requests.colors.getColor);
router.post(
  "/colors",
  middleware.canAdminWrite,
  middleware.validateBodyFields(["name"]),
  requests.colors.createColor,
);
router.patch(
  "/colors/:colorId",
  middleware.canAdminWrite,
  requests.colors.updateColor,
);
router.delete(
  "/colors/:colorId",
  middleware.canAdminDelete,
  requests.colors.deleteColor,
);

// USER
router.get("/user", requests.user.getUserId);
router.get("/user/info", requests.user.getUserInfo);

// CART ROUTES
router.get("/cart", requests.cart.getCart);
router.post(
  "/cart",
  middleware.validateBodyFields(["productId", "quantity"]),
  middleware.formatFields([["quantity", "number"]]),
  middleware.validateBodyIdsFields(["productId"]),
  requests.cart.createCart,
);
router.patch(
  "/cart",
  middleware.validateBodyFields(["productId", "quantity"]),
  middleware.formatFields([["quantity", "number"]]),
  middleware.validateBodyIdsFields(["productId"]),
  requests.cart.updateCart,
);
router.delete("/cart", requests.cart.deleteCart);

export default router;
