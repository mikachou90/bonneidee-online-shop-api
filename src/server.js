import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./router.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "../appConfig.js";
import errorHandler from "./errorHandler.js";

const swaggerOptions = {
  explorer: true,
  failOnErrors: false,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bonne idee API",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/**/*.js"],
};

const swaggerDocument = swaggerJsdoc(swaggerOptions);

mongoose.set("strictQuery", false);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    app.use(morgan("dev"));
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(methodOverride());

    const corsOptions = {
      origin: config.baseAppUrl,
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
