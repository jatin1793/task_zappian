const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env_config = require("../config/env_config");

exports.UserRegister = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  // console.log(req.body)
  try {
    if (!userName || !userEmail || !password) {
      return res.status(400).json({ msg: "Please select all fields" });
    }

    let user = await User.findOne({ userEmail });

    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({
      userName,
      userEmail,
      password: hash,
    });

    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });

    return res.status(200).json({
      msg: "User successfully registered",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });

    return res
      .status(200)
      .json({ token, user, msg: "User logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.UserLogout = async (req, res) => {
  try {
    res.clearCookie("jwt_token");
    return res.status(200).json({ msg: "Log out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.GetCurrentUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


exports.DeleteUser = async (req, res) => {
  try {
    console.log(req.body)
    const userId = req.body.userid;
    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Failed to delete user" });
  }
};


exports.GetAllUsers = async (req, res) => {
  try {
    const allusers = await User.find({ _id: { $ne: req.user._id } });
    return res.status(200).json(allusers);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.SearchUser = async (req, res) => {
  try {
    if (req.query.name) {
      const users = await User.find({
        _id: { $ne: req.user._id },
        userName: { $regex: req.query.name, $options: "i" },
      });
      return res.status(200).json(users);
    } else {
      const users = await User.find({
        _id: { $ne: req.user._id },
      });
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

exports.GetUser = async (req, res) => {
  try {
    console.log(req.params)
    const user = await User.find({ _id: req.params.userid });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.UpdateUser = async (req, res) => {
  const { userName, userEmail, userId } = req.body; 
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          userName: userName,
          userEmail: userEmail
        }
      },
      { new: true }
    );
    console.log("response is", user);
    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: "Error updating user" });
  }
};

exports.AddUser = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  try {
    if (!userName || !userEmail || !password) {
      return res.status(400).json({ msg: "Please select all fields" });
    }

    let user = await User.findOne({ userEmail });

    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({
      userName,
      userEmail,
      password: hash,
    });

    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });

    return res.status(200).json({
      msg: "User successfully registered",
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

