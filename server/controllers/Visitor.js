const Visitor = require("../models/Visitor");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'your_jwt_secret'; 

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
};

exports.createVisitor = async (req, res) => {
  try {
    const resData= await Visitor(req.body).save();
    
    const accessToken = generateAccessToken(resData._id);
    console.log(accessToken)

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: false, 
      sameSite: 'lax',
    });

    res.status(200).json({ data: resData, token: accessToken});
  } catch (err) {
    console.log(err);
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
