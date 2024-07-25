// Name,
// Image,
// serve member_id

const Drinks = require("../models/Drinks");

exports.createDrink = async (req, res) => {
  try {
    const drink = await Drinks(req.body).save();
    res.status(200).json({ data: drink });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listDrink = async (req, res) => {
    try {
      const drinks = await Drinks.find().exec();
      res.status(200).json({ data: drinks });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

exports.updateDrink = async (req, res) => {
  try {
    const drink = await Drinks.findOneAndUpdate(
      { _id: res.params._id },
      req.body
    ).exec();
    res.status(200).json({ data: drink });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.removeDrink = async (req, res) => {
  try {
    const drink = await Drinks.findByIdAndDelete(req.params._id).exec();
    res.status(200).json({ data: drink });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getDrink = async (req, res) => {
  try {
    const drink = await Drinks.findById(req.params._id).exec();
    res.status(200).json({ data: drink });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
