const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nayakmanasbivu_db_user:TmEePiI6PKTDg3J3@manasnode.rflg9by.mongodb.net/devtender",
  );
};


module.exports = connectDB;