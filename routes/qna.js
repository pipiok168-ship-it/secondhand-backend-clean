const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QnA = require("../models/QnA");

/**
 * GET /api/products/:productId/qna
 * 取得某商品 QnA 列表
 */
router.get("/products/:productId/qna", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const list = await QnA.find({ productId }).sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error("GET QnA error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/products/:productId/qna
 * 新增提問
 * body: { question }
 */
router.post("/products/:productId/qna", async (req, res) => {
  try {
    const { productId } = req.params;
    const { question } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    if (!question || !String(question).trim()) {
      return res.status(400).json({ message: "Question is required" });
    }

    const created = await QnA.create({
      productId,
      question: String(question).trim()
    });

    return res.json(created);
  } catch (err) {
    console.error("POST QnA error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/qna/:qnaId/answer
 * 賣家回覆
 * body: { answer }
 */
router.put("/qna/:qnaId/answer", async (req, res) => {
  try {
    const { qnaId } = req.params;
    const { answer } = req.body;

    if (!mongoose.Types.ObjectId.isValid(qnaId)) {
      return res.status(400).json({ message: "Invalid qnaId" });
    }
    if (answer === undefined) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const updated = await QnA.findByIdAndUpdate(
      qnaId,
      {
        answer: String(answer).trim(),
        answeredAt: new Date()
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "QnA not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("PUT Answer error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
