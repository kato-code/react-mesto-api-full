/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { createUser, loginUser } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { signinValidator, signupValidator } = require('./middlewares/validators.js');
const auth = require('./middlewares/auth.js');

const routesUsers = require('./routes/users.js');
const routesCards = require('./routes/cards.js');
const routeNotFound = require('./routes/routeNotFound.js');

const { PORT = 3000 } = process.env;
const app = express();

// cors
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Connected to DB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);

// краш тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

// запуск сервера
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// /* eslint-disable no-console */
// const express = require('express');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const cors = require('cors');
// // const bodyParser = require('body-parser');
// const { errors } = require('celebrate');

// const { createUser, loginUser } = require('./controllers/users.js');
// const { requestLogger, errorLogger } = require('./middlewares/logger.js');
// const { signinValidator, signupValidator } = require('./middlewares/validators.js');
// const auth = require('./middlewares/auth.js');

// const routesUsers = require('./routes/users.js');
// const routesCards = require('./routes/cards.js');
// const routeNotFound = require('./routes/routeNotFound.js');

// const { PORT = 3000 } = process.env;
// const app = express();

// // cors
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to DB'));

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // логгер запросов
// app.use(requestLogger);

// // краш тест
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// // обработчики роутов
// app.post('/signin', signinValidator, loginUser);
// app.post('/signup', signupValidator, createUser);

// app.use(auth);

// app.use('/', routesUsers);
// app.use('/', routesCards);
// app.use('/', routeNotFound);

// // логгер ошибок
// app.use(errorLogger);

// // обработчики ошибок
// app.use(errors());

// // централизованный обработчик
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: 'На сервере произошла ошибка' });

//   next();
// });

// app.listen(PORT, () => {
//   console.log(`On port ${PORT}`);
// });
