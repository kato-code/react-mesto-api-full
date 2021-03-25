/* eslint-disable eqeqeq */
const Card = require('../models/card.js');

// const { BadRequestError, NotFoundError, AuthorizationError } = require('../errors');
const BadRequestError = require('../errors/BadRequestError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const AuthorizationError = require('../errors/AuthorizationError.js');

// получить список карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

// создать карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      next(error);
    });
};

// удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемые данные не найдены');
      }
      if (card.owner != req.user._id) {
        throw new AuthorizationError('Недостаточно прав');
      }
      return Card.findByIdAndDelete(req.params._id);
    })
    .then(() => {
      res.status(200).send({ messages: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Карточка с таким id не найдена');
      }
      next(error);
    });
};
// const deleteCard = (req, res, next) => {
//   Card.findById(req.params.cardId)
//     .catch(() => {
//       throw new NotFoundError('Карточка с таким id не найдена');
//     })
//     .then((card) => {
//       if (req.user._id === card.owner.toString()) {
//         Card.findByIdAndRemove({ _id: card._id })
//           .then(() => {
//             res.status(200).send(card);
//           })
//           .catch(next);
//       }
//       throw new AuthorizationError('Нельзя удалять карточки других пользователей');
//     })
//     .catch((error) => {
//       if (error.name === 'CastError') {
//         throw new BadRequestError('Карточка с таким id не найдена');
//       }
//       next(error);
//     });
// };

// поставить лайк
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Карточка с таким id не найдена');
      }
      next(error);
    });
};

// убрать лайк
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Карточка с таким id не найдена');
      }
      next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
