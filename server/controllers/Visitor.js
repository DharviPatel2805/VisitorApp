// Name
// Mobile
// address 
// sign in datetime


const Visitor = require("../models/Visitor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createVisitor = async (req, res) => {
  try {
    const resData= await Visitor(req.body).save();
    // const isMatch = await bcrypt.compare(Password, user.Password);
    // if (!isMatch) {
    //   return res.status(400).json({ msg: "Invalid credentials" });
    // }

    // Create and assign token
    const token = jwt.sign({ id: resData._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
    res.status(200).json({ data: resData, token});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listVisitor = async (req, res) => {
    try {
      const resData= await Visitor.find().exec();
      res.status(200).json({ data: resData});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

exports.updateVisitor = async (req, res) => {
  try {
    const resData= await Visitor.findOneAndUpdate(
      { _id: res.params._id },
      req.body
    ).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.removeVisitor = async (req, res) => {
  try {
    const resData= await Visitor.findByIdAndDelete(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getVisitor = async (req, res) => {
  try {
    const resData= await Visitor.findById(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
