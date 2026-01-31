const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// =======================
// Multer 設定（上傳圖片）
// =======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

// =======================
// GET 所有商品
// =======================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("❌ Get products error:", err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// GET 單一商品
// =======================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("❌ Get product error:", err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// POST 新增商品（含圖片）
// =======================
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "缺少 name 或 price" });
    }

    // ⭐ 關鍵：用目前請求的網域產生圖片網址（本機 / 雲端都通）
    const imageUrls = (req.files || []).map(file => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
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

// =======================
// DELETE 刪除商品
// =======================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Delete product error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
