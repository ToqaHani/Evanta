const mongoose = require('mongoose');
const invitationsSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    invitationUrl: {
        type: String,
        required: true
    }
})
let invitations = mongoose.model("Invitations", invitationsSchema);
module.exports = invitations;