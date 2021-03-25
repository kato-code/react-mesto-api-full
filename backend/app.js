/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { createUser, loginUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { signinValidator, signupValidator } = require('./middlewares/validators.js');

const routesUsers = require('./routes/users.js');
const routesCards = require('./routes/cards.js');
const routeNotFound = require('./routes/routeNotFound.js');

const { PORT = 3000 } = process.env;
const app = express();

// cors
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// краш тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// логгер запросов
app.use(requestLogger);

// обработчики роутов
app.post('/signin', signinValidator, loginUser);
app.post('/signup', signupValidator, createUser);

app.use('/', auth, routesUsers);
app.use('/', auth, routesCards);
app.use('/', routeNotFound);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок
app.use(errors());

// централизованный обработчик
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });

  next();
});

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
