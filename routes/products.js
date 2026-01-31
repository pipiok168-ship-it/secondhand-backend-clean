const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");

// 存到本機 uploads 資料夾（簡單版）
const upload = multer({ dest: "uploads/" });

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Get products error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products（新增商品，多圖）
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "缺少 name 或 price" });
    }

    // 把上傳的檔案轉成圖片 URL
    const imageUrls = (req.files || []).map(file => {
      return `http://localhost:3000/uploads/${file.filename}`;
    });

    const product = new Product({
      name,
      price,
      description,
      imageUrls
    });

    const saved = await product.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("❌ Add product error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

