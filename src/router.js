import { Router } from "express";
import User from "./models/User.js";
import middleware from "./middleware.js";

const router = Router();

router.get("/user", middleware.jwtCheck, async (req, res) => {
  const user = await User.find({ email: req.user.email });
  res.send(user);
});

router.get("/product", async (req, res) => {
  const user = await User.find({ email: req.user.email });
  res.send(user);
});

export default router;
