const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company_id: {
        type: Number,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    position_title: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    data: {
        performanceReviewPage: {
            incoming: [Schema.Types.ObjectId], 
            outgoing: [Schema.Types.ObjectId] 
        },
        assignedTrainingPage: {
            incoming: [Schema.Types.ObjectId], 
            outgoing: [Schema.Types.ObjectId] 
        },
        PTORequestPage: {
            incoming: [Schema.Types.ObjectId], 
            outgoing: [Schema.Types.ObjectId] 
        }
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;