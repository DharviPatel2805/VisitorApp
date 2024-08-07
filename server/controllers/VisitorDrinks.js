// Fields: visitor_id
// Drink_id,
// State,
// serve datetime

const VisitorDrinks = require("../models/VisitorDrinks");

exports.createVisitorDrinks = async (req, res) => {
  try {
    const { drink_id } = req.body;

    // Set drinkid to null if it's not provided or explicitly null
    const visitorDrinkData = {
      ...req.body,
      drink_id: drink_id ? drink_id : null,
    };
    const resData= await VisitorDrinks(visitorDrinkData).save();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listVisitorDrinks = async (req, res) => {
  try {
    const resData= await VisitorDrinks.find().exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateVisitorDrinks = async (req, res) => {
  try {
    const resData= await VisitorDrinks.findOneAndUpdate(
      { _id: res.params._id },
      req.body
    ).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.removeVisitorDrinks = async (req, res) => {
  try {
    const resData= await VisitorDrinks.findByIdAndDelete(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getVisitorDrinks = async (req, res) => {
  try {
    const resData= await VisitorDrinks.findById(req.params._id).exec();
    res.status(200).json({ data: resData});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
