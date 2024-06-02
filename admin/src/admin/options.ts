import { AdminJSOptions } from 'adminjs';
import mongoose from 'mongoose';

import Products from '../../../api/models/Product.js';
import Orders from '../../../api/models/Order.js';
import Category from '../../../api/models/Category.js';
import Color from '../../../api/models/Color.js';
import Cart from '../../../api/models/Cart.js';

import componentLoader from './component-loader.js';


const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [Products, Orders, Category, Color, Cart],
  // databases: [mongooseDb],
};

export default options;
