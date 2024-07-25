// name, 
// image, 
// email, 
// mobile
// 
// Name,
// Image,
// serve member_id

const StaffMember = require("../models/StaffMember");

exports.createStaffMember = async (req, res) => {
  try {
    const resdata = await StaffMember(req.body).save();
    res.status(200).json({ data: resdata });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listStaffMember = async (req, res) => {
    try {
      const resData= await StaffMember.find().exec();
      res.status(200).json({ data: resData});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

exports.updateStaffMember = async (req, res) => {
  try {
    const resData= await StaffMember.findOneAndUpdate(
      { _id: res.params._id },
      req.body
    ).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.removeStaffMember = async (req, res) => {
  try {
    const resData= await StaffMember.findByIdAndDelete(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getStaffMember = async (req, res) => {
  try {
    const resData= await StaffMember.findById(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
