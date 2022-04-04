const mongoose = require('mongoose');

const pref_revSchema = mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    requestedUserId: {
        type: Number,
        required: true,
    },
    favorited: {
        type: Boolean,
        default: false,
    },
    peerReview: [{
        reviewId: {
            type: Number,
            required: true,
        },
        peerId: {
            type: Number,
            required: true,
        },
        overallComments: {
            type: String,
            required: true
        },
        growthFeedbackRating: {
            type: Number,
            required: true,
        },
        growthFeedbackComment: {
            type: String,
            required: true,
        },
        kindnessFeedbackRating: {
            type: Number,
            required: true,
        },
        kindnessFeedbackComment: {
            type: String,
            required: true,
        },
        deliveryFeedbackRating: {
            type: Number,
            required: true,
        },
        deliveryFeedbackComment: {
            type: String,
            required: true,
        },
        dateReviewCreated: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
}, {timestamps: true});

const Pref_Rev = mongoose.model("Performace Review", pref_revSchema);
module.exports = Pref_Rev;