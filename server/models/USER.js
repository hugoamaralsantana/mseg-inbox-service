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
        required: false,
        default: null
    }
}, {timestamps: true});

// JSON example body for POST
// {
//     "user_type": "employee",
//     "password": "1234",
//     "first_name": "Joe",
//     "last_name": "Burrow",
//     "email": joeBurrow@ligma.com,
//     "company_id": "6257a1fd43e724e24c03dd50",
//     "company_name": "Cool Co",
//     "position_title": null,
//     "start_date": null,
// }

const User = mongoose.model("User", userSchema);
module.exports = User;