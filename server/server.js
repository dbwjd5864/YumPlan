const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const favicon = require('express-favicon');

const connection = require('./server/db/connection.js');

// Import Routes
const mealRouter = require('./server/routes/mealRoutes');
const userRouter = require('./server/routes/userRoutes');

const app = express();
app.use(favicon(__dirname, '../client/build/favicon.ico'));

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
  app.use(express.static(path.join(__dirname, '../client/', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  );
}
