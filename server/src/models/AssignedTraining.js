const mongoose = require('mongoose');

const assignedTrainingSchema = mongoose.Schema({
    assignedTrainingId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    recipient_id: {
        type: Number,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    sender_id: {
        type: Number, 
        required: true
    },
    recipient_comments: {
        type: String,
        required: false
    },
    sender_comments: {
        type: String,
        required: false
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    favorited: {
        type: Boolean,
        required: true,
        default: false
    },
}, {timestamps: true});

const AssignedTraining = mongoose.model("AssignedTraining", assignedTrainingSchema);
module.exports = AssignedTraining;