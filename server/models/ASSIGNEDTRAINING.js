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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipient_due_date: {
        type: Date,
        required: false,
        default: null
    },
    sender: {
        type: String,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender_due_date: {
        type: Date,
        required: false,
        default: null
    },
    recipient_comments: {
        type: String,
        required: false,
        default: ''
    },
    sender_comments: {
        type: String,
        required: false,
        default: ''
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

// JSON example body for POST
// {
//     "type": "assignedTraining",
//     "status": "inProgress",
//     "recipient": "Jacob Matthews",
//     "recipient_id": "625f267aa6aeb39ee40b7aa8",
//     "recipient_due_date": null,
//     "sender": "Colby Jack",
//     "sender_id": "6257a21d43e724e24c03dd55",
//     "sender_due_date": null,
//     "recipient_comments": null,
//     "sender_comments": null,
//     "training": "https://lab.github.com/",
//     "is_completed": false,
//     "favorited": false
// }

const AssignedTraining = mongoose.model("AssignedTraining", assignedTrainingSchema);
module.exports = AssignedTraining;