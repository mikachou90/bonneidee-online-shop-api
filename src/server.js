import express from "express";
import morgan from "morgan";
import packageInfo from "../package.json" assert { type: "json" };
import router from "./router.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "../appConfig.js";

mongoose.set("strictQuery", false);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    app.use(morgan("dev"));

    const corsOptions = {
      origin: config.baseAppUrl,
      optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    // Serve the index page for all other requests
    app.get("/api/public", (_, res) => {
      //send a json response with the api verison
      res.json({ version: packageInfo.version });
    });

    app.use("/api", router);

    // Listen on port 3000
    app.listen(3000, () => console.log("Application running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
