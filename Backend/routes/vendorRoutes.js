const express = require("express");

const {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

const router = express.Router();

router.get("/:eventId", getVendors);

router.get("/vendor/:id", getVendorById);

router.post("/:eventId", createVendor);

router.put("/vendor/:id", updateVendor);

router.delete("/vendor/:id", deleteVendor);

module.exports = router;