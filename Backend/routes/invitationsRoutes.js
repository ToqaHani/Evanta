const express = require('express');
const router = express.Router();
const { getInvitation, createInvitation, deleteInvitation } = require('../controllers/invitationsController');
const upload = require('../config/multer');
router.get('/:eventId', getInvitation);
router.post('/:eventId', upload.single('invitationImage'), createInvitation);
router.delete('/:eventId', deleteInvitation);
module.exports = router;