const Invitations = require('../models/invitationsModel.js');
const cloudinary = require('../config/cloudinary');
const getInvitation = async (req, res) => {
    try {
        const invitation = await Invitations.findOne({
            eventId: req.params.eventId
        });
        if (!invitation) {
            return res.status(404).json({
                message: "Invitation not found!"
            });
        }
        res.status(200).json({
            message: "Invitation retrieved successfully!",
            invitation
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to retrieve invitation!",
            error: err.message
        });
    }
};

const createInvitation = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Invitation image is required!"
            });
        }
        const image = req.file;

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "evanta/invitations" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(image.buffer);
        });
        const imageUrl = uploadResult.secure_url;
        const publicId = uploadResult.public_id;
        const invitation = await Invitations.create({
            eventId: req.params.eventId,
            imageUrl: imageUrl,
            publicId: publicId,
            invitationUrl: req.body.invitationUrl
        });
        res.status(201).json({
            message: "Invitation created successfully!",
            invitation
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create invitation!",
            error: err.message
        });
    }
};

const deleteInvitation = async (req, res) => {
    try {
        const invitation = await Invitations.findOne({
            eventId: req.params.eventId
        });
        if (!invitation) {
            return res.status(404).json({
                message: "Invitation not found!",
            });
        }
        await cloudinary.uploader.destroy(invitation.publicId);
        await Invitations.deleteOne({
            eventId: req.params.eventId
        });
        res.status(200).json({
            message: "Invitation deleted successfully!",
            invitation
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to delete invitation!",
            error: err.message
        });
    }

};
module.exports = { getInvitation, createInvitation, deleteInvitation };