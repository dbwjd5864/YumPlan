const express = require('express');
const app = express();

const connection = require('./db/connection.js');

//Import Routes
const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Connect to DB and server
connection.once('open', () => {
  console.log('connected to database');

  const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Listenning on ${process.env.PORT || 8000} `);
  });
});

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/recipe', recipeRouter);
