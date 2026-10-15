require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

app.use("/api", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blog CRUD API is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();