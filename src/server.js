const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 連線 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

  console.log("MONGO_URI =", process.env.MONGO_URI);

// 測試路由
app.get("/", (req, res) => {
  res.send("secondhand-backend-clean OK");
});

// 新增商品
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// 取得所有商品
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
