require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const route = require('./routes/router');

app.use(route);

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URL, connectionParams)
    .then(() => {
      app.listen(process.env.PORT, (err) => {
        if (err) console.log('error occur while listening', process.env.PORT);
        console.log('server running successfully');
      });
    })
    .catch((error) => {
      console.log('error in mongoConnection', error);
    });
