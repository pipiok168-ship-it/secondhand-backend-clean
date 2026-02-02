require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

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
app.use("/api/products", productRoutes);

// ✅ auth（可選：檔案存在才掛）
const authPath = path.join(__dirname, "routes", "auth.js");
if (fs.existsSync(authPath)) {
  const authRoutes = require("./routes/auth");
  app.use("/api/auth", authRoutes);
  console.log("✅ auth routes loaded");
} else {
  console.log("⚠️ auth routes missing, skipped");
}

// ✅ googleChat（可選：檔案存在才掛）
const googleChatPath = path.join(__dirname, "routes", "googleChat.js");
if (fs.existsSync(googleChatPath)) {
  const googleChatRoute = require("./routes/googleChat");
  googleChatRoute(app);
  console.log("✅ googleChat routes loaded");
} else {
  console.log("⚠️ googleChat routes missing, skipped");
}

// ✅ qna（如果你有做就掛）
const qnaPath = path.join(__dirname, "routes", "qna.js");
if (fs.existsSync(qnaPath)) {
  const qnaRoutes = require("./routes/qna");
  app.use("/api", qnaRoutes);
  console.log("✅ qna routes loaded");
} else {
  console.log("⚠️ qna routes missing, skipped");
}

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
