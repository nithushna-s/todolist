require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
    database.close(() => {
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
    });
});
