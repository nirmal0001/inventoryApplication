const { deleteGame } = require('../db/queries');
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
  res.render('index', {
    content: 'game',
    title: 'Browse games',
    pageTitle: 'game',
  });
};

exports.deleteGame = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('/', { errors: result.array() });
    }
    const id = matchedData(req).id;

    await deleteGame(id);
    res.redirect('/genre');
  },
];
