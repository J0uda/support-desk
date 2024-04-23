const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server started in port ${process.env.PORT}`)
);
