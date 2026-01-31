require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// 中介層
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 靜態圖片
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 根路由
app.get("/", (req, res) => {
  res.send("secondhand-backend-clean OK");
});

// 路由
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// 啟動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});

