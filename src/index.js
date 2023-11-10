const express = require('express');
const bodyParser = require('body-parser');

const { connectDB, disconnectDB } = require('./db/db');
const { Exercise } = require('./models/Exercise');
const { exerciseRouter } = require('./routes/Exercise');


const app = express();
app.use(bodyParser.json());

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

app.use("/api/exercise", exerciseRouter);

app.get('/new', async() => {
  const exercise = await Exercise.create({ name: "user" });
  console.log(exercise);
});