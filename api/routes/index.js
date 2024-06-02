import getCategory from "./categories/get.js";
import listCategories from "./categories/list.js";
import createCategory from "./categories/create.js";
import updateCategory from "./categories/update.js";
import deleteCategory from "./categories/delete.js";

import getColor from "./colors/get.js";
import listColors from "./colors/list.js";
import createColor from "./colors/create.js";
import updateColor from "./colors/update.js";
import deleteColor from "./colors/delete.js";

import createProduct from "./products/create.js";
import updateProduct from "./products/update.js";
import deleteProduct from "./products/delete.js";
import getProduct from "./products/get.js";
import listProducts from "./products/list.js";

import createCart from "./cart/create.js";
import getCart from "./cart/get.js";
import updateCart from "./cart/update.js";
import deleteCart from "./cart/delete.js";

import getUserId from "./users/get.js";
import getUserInfo from "./users/infos.js";

import createOrder from "./orders/create.js";
import listOrders from "./orders/list.js";
import getOrder from "./orders/get.js";
import updateOrder from "./orders/update.js";

export default {
  products: {
    getProduct,
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  },
  categories: {
    getCategory,
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  },
  user: {
    getUserId,
    getUserInfo,
  },
  colors: {
    getColor,
    listColors,
    createColor,
    updateColor,
    deleteColor,
  },
  cart: {
    createCart,
    getCart,
    updateCart,
    deleteCart,
  },
  orders: {
    createOrder,
    listOrders,
    getOrder,
    updateOrder,
  },
};
