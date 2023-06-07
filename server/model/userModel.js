const mongoose = require("mongoose");
const { schema } = require("./secure/userValidations");

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, "username is required"],
      min: 3,
      max: 64,
      unique: true,
      trim: true,
   },
   email: {
      type: String,
      required: [true, "email is required "],
      min: 11,
      max: 64,
      unique: true,
      trim: true,
   },
   password: {
      type: String,
      required: [true, "password is required"],
      min: 8,
      max: 25,
      trim: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   isAvatarImageSet: {
      type: Boolean,
      default: false,
   },
   avatarImage: {
      type: String,
      default: "",
   },
});

userSchema.statics.userValidation = function (body) {
   return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Users", userSchema);
