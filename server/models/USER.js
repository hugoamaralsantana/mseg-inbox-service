const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
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
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;