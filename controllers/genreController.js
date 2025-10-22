const {
  getAllGenre,
  deleteGenre,
  updateGenre,
  createGenre,
} = require('../db/queries');
const {
  param,
  validationResult,
  matchedData,
  body,
} = require('express-validator');

exports.index = async (req, res) => {
  const data = await getAllGenre();
  res.render('index', {
    title: 'Browse Genres',
    content: 'genre',
    data,
  });
};

const idValidator = [
  param('id')
    .isNumeric()
    .withMessage('you need a valid id for this route')
    .toInt(),
];

exports.deleteGenre = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('/', { errors: result.array() });
    }
    const id = matchedData(req).id;
    await deleteGenre(id);
    res.redirect('/genre');
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
];

exports.updateGenre = [
  ...updateValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('/', { errors: result.array() });
    }
    const { id, name } = matchedData(req);
    await updateGenre(id, name);
    res.redirect('/genre');
  },
];

exports.createGenre = [
  ...updateValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('/', { errors: result.array() });
    }
    const { name } = matchedData(req);
    await createGenre(name);
    res.redirect('/genre');
  },
];
