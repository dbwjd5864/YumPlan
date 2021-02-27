const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const connection = require('./db/connection.js');

// Import Routes
const mealRouter = require('./routes/mealRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Connect to DB and server
connection.once('open', () => {
  console.log('connected to database');

  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listenning on ${process.env.PORT || 5000} `);
  });
});

// Middleware
app.use(express.json({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/meal', mealRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
}
