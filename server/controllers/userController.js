const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
   try {
      const { username, password } = req.body;

      // check if username or Email exists in database
      const email = username;
      const user = (await User.findOne({ username })) || (await User.findOne({ email }));
      if (!user)
         return res.json({ msg: "Incorrect Username/Email or Password", status: false });

      // Check if provided password matches the user password in database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
         return res.json({ msg: "Incorrect Username/Email or Password", status: false });

      // If the username/email and password are correct :

      // Remove password from user object for security reasons
      delete user.password;

      // Return user data for successful login
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};

module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;

      // Check if username is already in use
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) return res.json({ msg: "Username already used", status: false });

      // Check if email is already in use
      const emailCheck = await User.findOne({ email });
      if (emailCheck) return res.json({ msg: "Email already used", status: false });

      // Hashing provided password for security before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in database
      const user = await User.create({
         email,
         username,
         password: hashedPassword,
      });

      // Remove password from user object for security reasons
      delete user.password;

      // Return user data for successful register
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};

module.exports.getAllUsers = async (req, res, next) => {
   try {
      // Find users except one with provided ID and selecting specific fields
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
         "email",
         "username",
         "avatarImage",
         "_id",
      ]);

      // Return retrieved user information in JSON format as a response
      return res.json(users);
   } catch (ex) {
      next(ex);
   }
};

module.exports.setAvatar = async (req, res, next) => {
   try {
      const userId = req.params.id;
      const avatarImage = req.body.image;

      // Find user by 'userId' and update avatarImage and isAvatarImageSet fields
      const userData = await User.findByIdAndUpdate(
         userId,
         {
            isAvatarImageSet: true,
            avatarImage,
         },
         { new: true }
      );

      // Return a JSON response with information about updated avatarImage status
      return res.json({
         isSet: userData.isAvatarImageSet,
         image: userData.avatarImage,
      });
   } catch (ex) {
      next(ex);
   }
};

module.exports.logOut = (req, res, next) => {
   try {
      // Check if user ID is present in request parameters
      if (!req.params.id) return res.json({ msg: "User id is required " });

      // Remove user from onlineUsers array (onlineUsers : storage of key-value)
      onlineUsers.delete(req.params.id);

      // Send a successful response (status code: 200) successful logout
      return res.status(200).send();
   } catch (ex) {
      next(ex);
   }
};
