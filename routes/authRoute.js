import express from "express";
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const users = await User.find({});

    users.forEach((user) => {
      if (user.email === req.body.email) {
        throw new Error("Email already exists");
      }
      if (user.userName === req.body.userName) {
        throw new Error("UserName already exists");
      }
    });
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    const securedUser = {
      ...req.body,
      password: hashedPassword,
    };
    const user = await User.create(securedUser);
    res.status(201).json({ message: "User created succesfully!", body: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
