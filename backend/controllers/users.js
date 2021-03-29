/* eslint-disable max-len */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user.js');

const BadRequestError = require('../errors/BadRequestError.js');
const ConflictError = require('../errors/ConflictError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const UnauthorizedError = require('../errors/UnauthorizedError.js');

// получить список юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// получить информацию о текущем юзере
const getUserProfile = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Пользователь с таким id не найден');
      }
      next(error);
    });
};

// получить информацию о юзере по id
const getUserProfileById = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Пользователь с таким id не найден');
      }
      next(error);
    });
};

// создать нового юзера
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.send({ user });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new BadRequestError('Введены некорректные данные'));
          }
          next(new ConflictError('Пользователь уже существует'));
        });
    })
    .catch(next);
};

// обновить информацию в профиле юзера
const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      next(error);
    });
};

// обновить аватар в профиле юзера
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      next(error);
    });
};

// аутентификация
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Пользователь не зарегистрирован');
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserProfile,
  getUserProfileById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  loginUser,
};
