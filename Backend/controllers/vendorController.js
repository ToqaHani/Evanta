const mongoose = require("mongoose");
const Vendor = require("../models/vendors");

// GET ALL VENDORS
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get vendors",
      error: error.message,
    });
  }
};

// GET ONE VENDOR
const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid vendor ID",
      });
    }

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get vendor",
      error: error.message,
    });
  }
};

// CREATE VENDOR
const createVendor = async (req, res) => {
  try {
    const {
      type,
      name,
      phone,
      price,
      date,
      status,
      notes,
    } = req.body;

    if (!type || !name || !phone || price === undefined || !date) {
      return res.status(400).json({
        message: "Type, name, phone, price and date are required",
      });
    }

    const vendor = await Vendor.create({
      type,
      name,
      phone,
      price,
      date,
      status,
      notes,
    });

    res.status(201).json({
      message: "Vendor created successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create vendor",
      error: error.message,
    });
  }
};

// UPDATE VENDOR
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid vendor ID",
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      message: "Vendor updated successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update vendor",
      error: error.message,
    });
  }
};

// DELETE VENDOR
const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid vendor ID",
      });
    }

    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete vendor",
      error: error.message,
    });
  }
};

module.exports = {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};