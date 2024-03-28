import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      count: users.length,
      body: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get user by Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      message: "User found succesfully!!",
      body: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
