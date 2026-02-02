// routes/googleChat.js

module.exports = function (app) {
  app.post("/google-chat", async (req, res) => {
    const event = req.body;

    // Google Chat 一定要回 200 + JSON
    if (!event || !event.type) {
      return res.json({ text: "Invalid event" });
    }

    // 使用者發訊息
    if (event.type === "MESSAGE") {
      const text = event.message?.text?.trim() || "";

      // 指令：/help
      if (text === "/help") {
        return res.json({
          text: "🤖 二手平台 Bot 指令\n\n/help\n/商品 關鍵字"
        });
      }

      // 指令：/商品 iPhone
      if (text.startsWith("/商品")) {
        const keyword = text.replace("/商品", "").trim();

        if (!keyword) {
          return res.json({
            text: "請輸入商品關鍵字，例如：/商品 iPhone"
          });
        }

        // 先不查 DB，確認流程 OK
        return res.json({
          text: `🔍 正在查詢商品：${keyword}`
        });
      }

      // 預設回應
      return res.json({
        text: `你剛剛說的是：${text}`
      });
    }

    // 其他事件
    res.json({ text: "事件已接收" });
  });
};
