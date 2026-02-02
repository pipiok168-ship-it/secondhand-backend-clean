const mongoose = require("mongoose");

const QnASchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, default: "" },
    answeredAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QnA", QnASchema);
