const express = require("express");
const userAuth = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionreqSchema");

userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserID: loggedinUser._id,
      status: "interested",
    }).populate("fromUserID", ["firstName", "lastName"]);

    if (!connectionRequest) {
      return res.status(400).json({
        message: "Connectionrequest not found..",
      });
    }

    res.send(connectionRequest);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      fromUserID: loggedinUser._id,
      status: "accepted",
    }).populate("toUserID", ["firstName", "lastName"]);

    if (!connectionRequest) {
      throw new error("Connection request found");
    }
    res.json({
      message: "Data fecth successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
