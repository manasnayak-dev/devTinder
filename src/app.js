const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


 const auth = require("./routes/auth");
 const profile = require("./routes/profile");
 const connectionrequest = require("./routes/connectionrequest");
 const user = require("./routes/user");


 app.use("/", auth);
 app.use("/", profile);
 app.use("/", connectionrequest);
 app.use("/", user);
 

connectDB()
  .then(() => {
    console.log("Connected success fully");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Can not connect...");
  });
