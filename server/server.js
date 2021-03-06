const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users')
const companies = require('./routes/companies')
const assignedTraining = require('./routes/assignedTraining')
const performanceReviews = require('./routes/performanceReviews')
const PTORequests = require('./routes/PTORequests')
const cors = require('cors');

const app = express();
app.use(express.json());

// Connect to the Database
connectDB();

app.use(cors())
app.get('/', (req, res) => res.send('Test server!'));
app.use('/users', users);
app.use('/companies', companies);
app.use('/assignedTrainings', assignedTraining);
app.use('/performanceReviews', performanceReviews);
app.use('/PTORequests', PTORequests);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;