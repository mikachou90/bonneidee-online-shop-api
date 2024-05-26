//package imports
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import router from "./router.js";
import errorHandler from "./errorHandler.js";
//Model Docs
import { cartSchemaDoc } from "./models/Cart.js";
import { categorySchemaDoc } from "./models/Category.js";
import { productSchemaDoc } from "./models/Product.js";
import { colorSchemaDoc } from "./models/Color.js";
//Routes Docs
import { cartDocs } from "./routes/cart/doc/cart.js";
import { categoriesDocs } from "./routes/categories/doc/categories.js";
import { colorsDocs } from "./routes/colors/doc/colors.js";
import { productsDocs } from "./routes/products/doc/products.js";
import { userDocs } from "./routes/users/doc/user.js";

const swaggerOptions = {
  explorer: true,
  failOnErrors: false,
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Bonne idee API",
      description: "Bonne idee API Information",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...cartSchemaDoc,
        ...categorySchemaDoc,
        ...productSchemaDoc,
        ...colorSchemaDoc,
      },
    },
    paths: {
      ...cartDocs,
      ...categoriesDocs,
      ...colorsDocs,
      ...productsDocs,
      ...userDocs,
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
      {
        url: "https://bonneidee.com/api/v1",
      },
    ],
  },
  apis: ["api/routes/**/*.js"],
};

const swaggerDocument = swaggerJsdoc(swaggerOptions);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    app.use(morgan("dev"));
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());
    app.use(methodOverride());

    const corsOptions = {
      origin: process.env.baseAppUrl,
      optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api/v1", router);

    //handle errors
    app.use(errorHandler.handleServerError);

    //handle not found errors
    app.use(errorHandler.handleNotFoundError);

    // Listen on port 3000
    app.listen(3000, () => console.log("Application running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
