const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });

      // username unique
      if (usernameCheck)
         return res.json({ message: "Username already used", status: false });

      // email unique
      const emailCheck = await User.findOne({ email });
      if (emailCheck) return res.json({ message: "Email already used", status: false });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
         email,
         username,
         password: hashedPassword,
      });

      delete user.password;
      return res.json({ status: true, user });
   } catch (error) {
      next(error);
   }
};

module.exports.login = async (req, res, next) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      // check user
      if (!user)
         return res.json({ message: "Incorrent username or password", status: false });

      // check email
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
         return res.json({ message: "Incorrent username or password", status: false });

      delete user.password;
      return res.json({ status: true, user });
   } catch (error) {
      next(error);
   }
};
