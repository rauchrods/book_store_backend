import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//addd book
router.post("", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.pageCount ||
      !req.body.genre ||
      !req.body.pdfLink ||
      !req.body.userId
    ) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const book = await Book.create(req.body);

    res.status(201).send({
      message: "book created succesfully",
      body: book,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get all books
router.get("", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(201).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get book by book id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(500).send({ message: "id not present in database" });
    }
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get book by user id
router.get("/userId/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.find({ userId: id });
    if (!books) {
      return res.status(500).send({ message: "id not present in database" });
    }
    res.status(201).send({
      count: books.length,
      body: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//update a book by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body);

    if (!updatedBook) {
      return res.status(400).send({ message: "Book not found" });
    }
    const book = await Book.findById(id);
    res.status(201).send({ message: "book updated succesfully", book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(400).send({ message: "Book not found" });
    }

    res.status(201).send({ message: "book deleted succesfully", deletedBook });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
