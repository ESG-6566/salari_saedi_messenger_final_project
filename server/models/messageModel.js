const mongoose = require("mongoose");

// Create schema
const MessageSchema = mongoose.Schema(
   {
      // Defining structure for each message in schema
      message: {
         text: { type: String, required: true },
      },
      users: Array,

      // Storing sender of the message (refers to 'User' model)
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true, // Add timestamps for 'createdAt' and 'updatedAt'
   }
);

module.exports = mongoose.model("Messages", MessageSchema);
