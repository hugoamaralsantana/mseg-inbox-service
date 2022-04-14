const mongoose = require('mongoose');

const assignedTrainingSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    recipient_id: {
        type: String,
        required: true
    },
    recipient_due_date: {
        type: Date,
        required: false
    },
    sender: {
        type: String,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    sender_due_date: {
        type: Date,
        required: false
    },
    recipient_comments: {
        type: String,
        required: false
    },
    sender_comments: {
        type: String,
        required: false
    },
    training: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    favorited: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {timestamps: true});

const AssignedTraining = mongoose.model("AssignedTraining", assignedTrainingSchema);
module.exports = AssignedTraining;