import express from "express";
import { connectDB } from "./config/db.js";
import Books from "./config/models/Books.js";
import cors from "cors";

const PORT = 3000;
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin:'http://127.0.0.1:5500',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))


connectDB();

app.get("/api/books", async (req, res) => {
  try {
    const allBooks = await Books.find();
    return res.status(200).json({
      success: true,
      data: allBooks,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/api/book", async (req, res) => {
  const { name, description, author, price, image } = req.body;
  
  console.log("Received book data:", {
    name,
    description,
    author,
    price,
    imageSize: image ? image.length : 0
  });

  try {
    const query = { title: name, author: author };
    const existingBooks = await Books.findOne(query);
    if (existingBooks) {
      return res.status(200).json({
        success: false,
        data: existingBooks,
        error: "A book with this title and author already exists",
      });
    }

    const newBook = new Books({
      title: name,
      description: description,
      author: author,
      price: price,
      imageSrc: image,
      isPublished: true
    });

    await newBook.save();
    
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    console.log("Error adding book:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/api/book/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedBook = await Books.findByIdAndDelete(id);
    
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log("Error deleting book:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
