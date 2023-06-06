const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
   try {
      console.log(req.body);
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });

      // username unique
      if (usernameCheck)
         return res.json({ message: "Username already used", status: false });

      // email unique
      const emailCheck = await User.findOne({ email });
      if (emailCheck) return res.json({ message: "Email already used", status: false });

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create user
      const user = await User.create({
         email,
         username,
         password: hashedPassword,
      });

      delete user.password;
      return res.json({ status: true, user });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports.login = async (req, res, next) => {
   try {
      console.log(req.body);
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      // check username
      if (!user)
         return res.json({ message: "Incorrent username or password", status: false });

      // check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
         return res.json({ message: "Incorrent username or password", status: false });

      delete user.password;
      return res.json({ status: true, user });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports.setAvatar = async (req, res, next) => {
   try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(userId, {
         isAvatarImageSet: true,
         avatarImage,
      });
      return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports.getAllUsers = async (req, res, next) => {
   try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
         "email",
         "username",
         "avatarImage",
         "_id",
      ]);
      console.log(users);

      return res.json(users);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
