// const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
   try {
      const { from, to } = req.body;

      // Find messages sender and Receiver and sort them
      const messages = await Messages.find({
         users: {
            $all: [from, to],
         },
      }).sort({ updatedAt: 1 });

      // Transform retrieved messages to a projected format for response
      const projectedMessages = messages.map((msg) => {
         return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
         };
      });

      // Send transformed messages as a JSON response
      res.json(projectedMessages);
   } catch (ex) {
      next(ex);
   }
};

module.exports.addMessage = async (req, res, next) => {
   try {
      const { from, to, message } = req.body;

      // Creat a new message in database with extracted data
      const data = await Messages.create({
         message: { text: message }, // Storing the message content
         users: [from, to], // Linking message to receiver
         sender: from, // Marking sender of the message
      });

      // if message creation was successful
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
   } catch (ex) {
      next(ex);
   }
};
