import { Router } from "express";
import middleware from "./middleware.js";
import requests from "./routes/index.js";

const router = Router();

router.param("productId", middleware.validateParamsField);
router.param("categoryId", middleware.validateParamsField);
router.param("colorId", middleware.validateParamsField);

// protect all routes starting with /user, /cart
router.all(
  ["/user*", "/cart*", "/orders*"],
  middleware.checkToken,
  middleware.insertAuthPayload,
);

// PRODUCTS ROUTES
router.get("/products/:productId", requests.products.getProduct);
router.get("/products", requests.products.listProducts);
router.post(
  "/products",
  middleware.canAdminWrite,
  middleware.validateBodyFields(["name", "price"]),
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
router.delete(
  "/products/:productId",
  middleware.canAdminDelete,
  requests.products.deleteProduct,
);

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
  middleware.validateBodyFields(["productId"]),
  middleware.formatFields([["quantity", "number"]]),
  middleware.validateBodyIdsFields(["productId", "colorId"]),
  requests.cart.updateCart,
);
router.delete("/cart", requests.cart.deleteCart);

// ORDER ROUTES
router.get("/orders", requests.orders.listOrders);
router.get("/orders/:orderId", requests.orders.getOrder);
router.post(
  "/orders",
  middleware.validateBodyFields(["cartId", "shippingAddress", "paymentMethod"]),
  middleware.validateBodyIdsFields(["cartId"]),
  requests.orders.createOrder,
);
router.patch(
  "/orders/:orderId",
  middleware.canAdminWrite,
  requests.orders.updateOrder,
);

export default router;
