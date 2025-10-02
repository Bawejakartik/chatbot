const express = require("express");
const conversation = require("../model/conversation");
const messagemodel = require("../model/messagemodel");
const { getReceiverSocketId ,getIo} = require("../socket/socket");


// exports.sendmessage = async (req, res) => {
//   try {
//     const senderId = req.id;
//     const receiverid = req.params.id;
//     const { message } = req.body;
//     let gotconversation = await conversation.findOne({
//       participants: { $all: [senderId, receiverid] },
//     });
//     if (!gotconversation) {
//       gotconversation = await conversation.create({
//         participants: [senderId, receiverid],
//       });
//     }
//     const newMessage = await messagemodel.create({
//       senderId,
//       receiverid,
//       message,
//     });

//     if (newMessage) {
//       gotconversation.messages.push(newMessage._id);
//     }
//     // await Promise.all([gotconversation.save(), newMessage()]);

//     await gotconversation.save();

//     //socket io

//     const recieverSocketID = getReceiverSocketId(receiverid);
//     if (recieverSocketID) {
//       io.to(recieverSocketID).emit("newMessage", newMessage);
//     }

//     return res.status(200).json({
//       newMessage,
//     });
//     //socket IO
//   } catch (err) {
//     console.log(err);
//   }
// };



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
      await gotconversation.save();
    }

    // ✅ Correct socket usage
    const receiverSocketID = getReceiverSocketId(receiverid);
    if (receiverSocketID) {
      const io = getIo();
      io.to(receiverSocketID).emit("newMessage", newMessage);
    }

    return res.status(200).json({ newMessage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Message not sent" });
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
    // console.log(Conversation);

    return res.status(201).json({
      success: true,
      messages: Conversation?.messages,
    });
  } catch (Err) {
    console.log(Err);
  }
};
