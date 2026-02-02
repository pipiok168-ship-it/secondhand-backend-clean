require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 靜態圖片
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 根路由（健康檢查）
app.get("/", (req, res) => {
  res.send("secondhand-backend-clean OK");
});

// ===== Routes =====
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const googleChatRoute = require("./routes/googleChat"); // ✅ 你原本就有
const qnaRoutes = require("./routes/qna");              // 🔥 新增

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// 🔥 掛 QnA（注意是 /api，不是 /api/products）
app.use("/api", qnaRoutes);

// 🔥 掛 Google Chat Bot
googleChatRoute(app);

// ===== MongoDB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ===== Start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
