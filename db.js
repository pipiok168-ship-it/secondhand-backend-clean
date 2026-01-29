const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb://secondhand:ab200154@" +
  "ac-anjoovr-shard-00-00.ymjsoib.mongodb.net:27017," +
  "ac-anjoovr-shard-00-01.ymjsoib.mongodb.net:27017," +
  "ac-anjoovr-shard-00-02.ymjsoib.mongodb.net:27017/" +
  "secondhand?ssl=true&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch(err => {
    console.error("❌ MongoDB connect error:", err);
  });

module.exports = mongoose;
