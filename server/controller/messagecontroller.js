const express = require("express");
const conversation = require("../model/conversation");
const messagemodel = require("../model/messagemodel");

exports.sendmessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverid = req.params.id;
    const { message } = req.body;
    let gotconversation = await conversation.findOne({
      participants: { $all: [senderId, receiverid] },
    });
    if (!gotconversation) {
      gotconversation = await conversation.create({
        participants: [senderId, receiverid],
      });
    }
    const newMessage = await messagemodel.create({
      senderId,
      receiverid,
      message,
    });

    if (newMessage) {
      gotconversation.messages.push(newMessage._id);
    }
    await gotconversation.save();

    return res.status(200).json({
      message: "message sent successfully",
      success: true,
    });
    //socket IO
  } catch (err) {
    console.log(err);
  }
};

exports.getmessage = async (req, res) => {
  try {
    const receiverid = req.params.id;
    const senderId = req.id;

    const Conversation = await conversation
      .findOne({
        participants: { $all: [senderId, receiverid] },
      })
      .populate("messages");
    //  console.log(Conversation);

    return res.status(201).json({
      success: true,
      messages: Conversation?.messages || [],
    });
  } catch (Err) {
    console.log(Err);
  }
};
