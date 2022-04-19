const mongoose = require('mongoose');

const PTORequestSchema = mongoose.Schema({
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
    pto_type: {
        type: String,
        required: true,
    },
    pto_start: {
        type: Date,
        required: true,
    },
    pto_end: {
        type: Date,
        required: true
    },
    isApproved: {
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

// EXAMPLE POST BODY
// {
//     "type": "PTORequest",
//     "status": "inProgress",
//     "recipient": "Jacob Matthews",
//     "recipient_id": "6257a1fd43e724e24c03dd50",
//     "recipient_due_date": null,
//     "sender": "Colby Jack",
//     "sender_id": "6257a21d43e724e24c03dd55",
//     "sender_due_date": null,
//     "recipient_comments": null,
//     "sender_comments": null,
// 	"pto_type": "vacation",
// 	"pto_start": "11/20/22",
// 	"pto_end": "11/21/22",
//     "favorited": false
// }

const PTORequest = mongoose.model("PTORequest", PTORequestSchema);
module.exports = PTORequest