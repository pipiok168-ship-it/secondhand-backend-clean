const express = require("express");
const router = express.Router();

console.log("✅ auth routes loaded"); // 👈 加這行

// 暫時寫死帳號密碼（之後可改成資料庫）
const ADMIN_ACCOUNT = "admin";
const ADMIN_PASSWORD = "vip2025";

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { account, password } = req.body;

  if (!account || !password) {
    return res.status(400).json({ success: false, message: "缺少帳號或密碼" });
  }

  if (account === ADMIN_ACCOUNT && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "登入成功"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "帳號或密碼錯誤"
    });
  }
});

module.exports = router;
