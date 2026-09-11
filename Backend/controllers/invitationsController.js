const Invitations = require('../models/invitationsModel.js');
// 
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
        const invitation = await Invitations.create({
            eventId: req.params.eventId,
            imageUrl: req.body.imageUrl,
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
        const invitation = await Invitations.findByIdAndDelete(req.params.invitationId);
        if (!invitation) {
            return res.status(404).json({
                message: "Invitation not found!",
            });
        }
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