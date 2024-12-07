const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "ok", user, token });
      } else {
        throw new Error("Password is incorrect");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};

module.exports = userController;
