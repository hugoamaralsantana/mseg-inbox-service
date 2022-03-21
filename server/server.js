const express = require('express');
const connectDB = require('./config/db');

const app = express();

const user = require("./routes/api/user");

// Connect to the Database
connectDB();

app.get('/', (req, res) => res.send('Test server!'));

app.use("/api/user",user);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
