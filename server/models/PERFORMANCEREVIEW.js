const mongoose = require('mongoose');

const performanceReviewSchema = mongoose.Schema({
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
    overall_comments: {
        type: String,
        required: false,
        default: ''
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
    growth_score: {
        type: Number,
        required: false,
        default: null
    },
    growth_comments: {
        type: String,
        required: false,
        default: ''
    },
    kindness_score: {
        type: Number,
        required: false,
        default: null
    },
    kindness_comments: {
        type: String,
        required: false,
        default: ''
    },
    delivery_score: {
        type: Number,
        required: false,
        default: null
    },
    delivery_comments: {
        type: String,
        required: false,
        default: ''
    },
    favorited: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {timestamps: true});

// EXAMPLE POST BODY
// {
//     "type": "performanceReview",
//     "status": "inProgress",
//     "recipient": "Jacob Matthews",
//     "recipient_id": "6257a1fd43e724e24c03dd50",
//     "recipient_due_date": null,
//     "sender": "Colby Jack",
//     "sender_id": "6257a21d43e724e24c03dd55",
//     "sender_due_date": null,
//     "recipient_comments": null,
//     "sender_comments": null,
// 	   "growth_score": null,
// 	   "growth_comments": null,
// 	   "kindness_score": null,
// 	   "kindness_comments": null,
// 	   "delivery_score": null,
// 	   "delivery_comments": null,
//     "favorited": false
// }

const PerformanceReview = mongoose.model("PerformanceReview", performanceReviewSchema);
module.exports = PerformanceReview