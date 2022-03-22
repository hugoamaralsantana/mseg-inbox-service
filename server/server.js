const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users')

const app = express();

// Connect to the Database
connectDB();

app.get('/', (req, res) => res.send('Test server!'));
app.use('/user', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));