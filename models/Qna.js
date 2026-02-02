const mongoose = require("mongoose");

const QnaSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    askerName: {
      type: String,
      default: "匿名",
    },
    answer: {
      type: String,
      default: "",
    },
    answeredAt: {
      type: Date,
      default: null,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qna", QnaSchema);
