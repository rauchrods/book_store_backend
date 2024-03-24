import express from "express";
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
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
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) {
      throw new Error("Email does not exist");
    }

    const validPassword = bcryptjs.compareSync(
      req.body.password,
      validUser.password
    );

    if (!validPassword) {
      throw new Error("Wrong Credentials");
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {password, ...rest} = validUser._doc;


    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ message: "User logged in  succesfully!", body: rest });
  } catch (error) {
    next(error);
  }
});

export default router;
