const express = require('express');
const bodyParser = require('body-parser');

const { connectDB, disconnectDB } = require('./db/db');
const { Exercise } = require('./models/Exercise');
const { exerciseRouter } = require('./routes/Exercise');
const { categorieRouter } = require('./routes/Category');
const { activityRouter } = require('./routes/Activity');

const app = express();
app.use(bodyParser.json());

app.use("/api/exercise", exerciseRouter);
app.use('/api/category', categorieRouter);
app.use('/api/activity', activityRouter);

const server = app.listen(process.env.PORT, () => {
  console.log("API started in port", process.env.PORT);
  connectDB();
});

process.on('SIGINT', () => {
  console.log('API shutting down');
  disconnectDB();
  server.close(() => {
    console.log('shutted down');
  });
});

app.get('/new', async() => {
  const exercise = await Exercise.create({ name: "user" });
  console.log(exercise);
});