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

const PerformanceReview = mongoose.model("PerformanceReview", performanceReviewSchema);
module.exports = PerformanceReview