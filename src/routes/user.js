const express = require("express");
const userAuth = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionreqSchema");

userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const requests = await ConnectionRequest.find({
      toUserID: loggedinUser._id,
      status: "interested",
    })
      .populate("fromUserID", "firstName lastName photoURL")
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    const total = await ConnectionRequest.countDocuments({
      toUserID: loggedinUser._id,
      status: "interested",
    });

    res.status(200).json({
      message: "Requests fetched successfully",
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserID: loggedinUser._id }, { toUserID: loggedinUser._id }],
      status: "accepted",
    })
      .populate("toUserID", "firstName lastName photoURL")
      .populate("fromUserID", "firstName lastName photoURL");

    const data = connections.map((connection) => {
      if (
        connection.fromUserID._id.toString() === loggedinUser._id.toString()
      ) {
        return connection.toUserID;
      }
      return connection.fromUserID;
    });
    res.json({
      message: "Data fecth successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
