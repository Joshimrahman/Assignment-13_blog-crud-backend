const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// POST /blogs — Create a new blog
router.post("/blogs", async (req, res) => {
  try {
    const { title, description, author } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "title, description, and author are required",
      });
    }

    const blog = await Blog.create({ title, description, author });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /blogs — Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /blogs/:id — Get a single blog
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid blog ID or server error",
    });
  }
});

// DELETE /blogs/:id — Delete a blog
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid blog ID or server error",
    });
  }
});

module.exports = router;