const UserModel = require('../models/user');
const CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

const postNewUser = async (req, res) => {
  try {
   
    const newUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    const userDetails=await UserModel.findOne({username:newUser.username});
   
      const accessToken = jwt.sign(
        {
          id: userDetails._id,
          isAdmin: userDetails.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: '3d' }
      );
       const { password, ...others } = userDetails;
       res.status(200).json({ ...others._doc, accessToken });
    
  } catch (error) {
    res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ msg: 'Wrong username' });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ msg: 'Wrong password' });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    const { password, ...others } = user;
    res.status(200).json({ ...others._doc, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserById = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } 
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserModel.findById(req.params.id);
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'User has been deleted...', deletedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.query.name });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  postNewUser,
  userLogin,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
  getUserByName,
};
