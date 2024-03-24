import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "User Api is working" });
});

export default router;
