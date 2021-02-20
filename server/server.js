const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const connection = require('./db/connection.js');

// Import Routes
const mealRouter = require('./routes/mealRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware
app.use(helmet());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(cors());
app.use(cookieParser());

// Connect to DB and server
connection.once('open', () => {
  console.log('connected to database');

  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listenning on ${process.env.PORT || 5000} `);
  });
});

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/meal', mealRouter);
