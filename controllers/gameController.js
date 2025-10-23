const {
  deleteGame,
  getGame,
  getAllGames,
  updateGame,
} = require('../db/queries');
const {
  param,
  validationResult,
  matchedData,
  body,
} = require('express-validator');

const idValidator = [
  param('id')
    .isNumeric()
    .withMessage('you need a valid id for this route')
    .toInt(),
];

exports.index = async (req, res) => {
  const data = await getAllGames();
  res.render('index', {
    content: 'game',
    title: 'Browse games',
    pageTitle: 'Games',
    data: data,
  });
};

exports.deleteGame = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('/index', { errors: result.array() });
    }
    const id = matchedData(req).id;

    await deleteGame(id);
    res.redirect('/game');
  },
];

const updateValidator = [
  body('id').trim().isInt().withMessage('update id should be numeric').toInt(),
  body('name')
    .trim()
    .isString()
    .withMessage('name must be a string')
    .notEmpty()
    .withMessage('name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required for a game'),
  body('poster_url')
    .trim()
    .isURL()
    .withMessage('a valid url to image is required'),
  body('platform')
    .trim()
    .notEmpty()
    .withMessage('please specify the platform where game is available on'),
];

exports.updateGame = [
  updateValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const data = matchedData(req);
    await updateGame(data);
    await res.redirect('/game');
  },
];

exports.createGameGet = async (req, res) => {
  res.render('/index', { title: 'create a game', content: 'createGame' });
};
