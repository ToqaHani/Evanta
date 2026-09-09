const express = require('express');
const router = express.Router();
const { getInvitation, createInvitation, deleteInvitation } = require('../controllers/invitationsController');
router.get('/:eventId', getInvitation);
router.post('/:eventId', createInvitation);
router.delete('/:invitationId', deleteInvitation);
module.exports = router;