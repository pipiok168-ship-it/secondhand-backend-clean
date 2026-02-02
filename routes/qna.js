const express = require("express");
const router = express.Router();
const Qna = require("../models/Qna");

/**
 * 取得某商品的 QnA
 * GET /api/products/:id/qna
 */
router.get("/products/:id/qna", async (req, res) => {
  const { id } = req.params;

  const list = await Qna.find({
    productId: id,
    isHidden: false,
  }).sort({ createdAt: -1 });

  res.json(list);
});

/**
 * 新增提問
 * POST /api/products/:id/qna
 */
router.post("/products/:id/qna", async (req, res) => {
  const { id } = req.params;
  const { question, askerName } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ message: "question required" });
  }

  const item = await Qna.create({
    productId: id,
    question: question.trim(),
    askerName: (askerName || "").trim() || "匿名",
  });

  res.json(item);
});

/**
 * 回覆問題（賣家）
 * POST /api/qna/:qnaId/answer
 */
router.post("/qna/:qnaId/answer", async (req, res) => {
  const { qnaId } = req.params;
  const { answer } = req.body;

  if (!answer || !answer.trim()) {
    return res.status(400).json({ message: "answer required" });
  }

  const updated = await Qna.findByIdAndUpdate(
    qnaId,
    {
      answer: answer.trim(),
      answeredAt: new Date(),
    },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "qna not found" });
  }

  res.json(updated);
});

module.exports = router;
