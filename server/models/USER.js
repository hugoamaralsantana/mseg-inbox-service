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
            incoming: [Number], 
            outgoing: [Number] 
        },
        assignedTrainingPage: {
            incoming: [Number], 
            outgoing: [Number] 
        },
        PTORequestPage: {
            incoming: [Number], 
            outgoing: [Number] 
        }
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;