const VisitorDetails = require("../models/VisitorDetails");


exports.createVisitorDetails = async (req, res) => {
  try {
    const resData= await VisitorDetails(req.body).save();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listVisitorDetails = async (req, res) => {
  try {
    const resData= await VisitorDetails.find().exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateVisitorDetails = async (req, res) => {
  try {
    const resData= await VisitorDetails.findOneAndUpdate(
      { _id: res.params._id },
      req.body
    ).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.removeVisitorDetails = async (req, res) => {
  try {
    const resData= await VisitorDetails.findByIdAndDelete(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getVisitorDetails = async (req, res) => {
  try {
    const resData= await VisitorDetails.findById(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
