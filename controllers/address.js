const AddressModel = require('../models/address');

const addAddress = async (req, res) => {
  try {
    const newAddress = await AddressModel.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const allAddress = await AddressModel.find({ userId: req.params.userId });
    res.status(200).json(allAddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editAddressById = async (req, res) => {
  try {
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const deletedAddress = await AddressModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addAddress,
  getAllAddresses,
  editAddressById,
  deleteAddressById,
};
