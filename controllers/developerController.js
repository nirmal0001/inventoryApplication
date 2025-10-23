const {
  getAllDeveloper,
  deleteDeveloper,
  updateDeveloper,
  createDeveloper,
  getGamesFromDeveloper,
} = require('../db/queries');
const {
  param,
  body,
  validationResult,
  matchedData,
} = require('express-validator');

exports.index = async (req, res) => {
  const data = await getAllDeveloper();
  res.render('index', {
    title: 'Browse Developers',
    content: 'developer',
    data,
  });
};

const idValidator = [
  param('id')
    .isNumeric()
    .withMessage('you need a valid id for this route')
    .toInt(),
];
exports.showGames = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const id = matchedData(req).id;
    const data = await getGamesFromDeveloper(id);
    res.render('index', {
      content: 'game',
      title: 'Browse games',
      pageTitle: 'Games',
      data: data,
    });
  },
];

exports.deleteDeveloper = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const id = matchedData(req).id;
    await deleteDeveloper(id);
    res.redirect('/developer');
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

exports.updateDeveloper = [
  ...updateValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const { id, name } = matchedData(req);
    await updateDeveloper(id, name);
    res.redirect('/developer');
  },
];

exports.createDeveloper = [
  ...updateValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const { name } = matchedData(req);
    await createDeveloper(name);
    res.redirect('/developer');
  },
];
