const mongoose = require('mongoose');


/*
    Example User
        {
        "firstName" : "Hans",
        "lastName" : "Barton",
        "employeeId" : 1,
        "email" : "Hans_Barton@atlastechnology.com",
        "companyId" : 2,
        "companyName" : "Atlas Technology",
        "positionTitle" : "CEO",
        "startDate" : "2005-02-20",
        "isManager" : true,
        "password" : "bartonha"
        }

*/

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    employeeId: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    companyId: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    positionTitle: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isManager: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;