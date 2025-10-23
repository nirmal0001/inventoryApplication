const {
  deleteGame,
  createGenreGame,
  createDeveloperGame,
  createGame,
  createGenre,
  getAllGames,
  updateGame,
  getAllGenre,
  getAllDeveloper,
  createDeveloper,
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
  // get developers and genre
  const genres = await getAllGenre();
  const developers = await getAllDeveloper();
  res.render('index', {
    title: 'create a game',
    content: 'createGame',
    genres,
    developers,
  });
};

const createValidator = [
  body('name')
    .trim()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required for a game'),

  body('poster_url')
    .trim()
    .isURL()
    .withMessage('A valid URL to an image is required'),

  body('platform')
    .trim()
    .notEmpty()
    .withMessage('Please specify the platform where the game is available'),

  body('developer')
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .custom((arr) => arr.every((e) => Number(e)))
    .withMessage('Developer array must contain only integers'),

  body('createDeveloper')
    .optional({ checkFalsy: true })
    .trim()
    .customSanitizer((value) => {
      if (!value) return '';
      return value;
    })
    .isString()
    .withMessage('createDeveloper must be a comma-separated string'),

  body('genre')
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .custom((arr) => arr.every((e) => Number(e)))
    .withMessage('Genre array must contain only integers'),

  body('createGenre')
    .optional({ checkFalsy: true })
    .trim()
    .customSanitizer((value) => {
      if (!value) return '';
      return value;
    })
    .isString()
    .withMessage('createGenre must be a comma-separated string'),
];
exports.createGamePost = [
  createValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('index', { title: 'error', errors: result.array() });
    }
    const data = matchedData(req);
    // both are g and d + gC and dC are empty
    const hasDeveloper =
      (data.developer && data.developer.length > 0) ||
      (data.createDeveloper && data.createDeveloper.trim() !== '');

    const hasGenre =
      (data.genre && data.genre.length > 0) ||
      (data.createGenre && data.createGenre.trim() !== '');

    if (!hasDeveloper || !hasGenre) {
      return res.render('index', {
        title: 'Error',
        errors: [
          {
            msg: 'You must provide at least one developer and at least one genre',
          },
        ],
      });
    }

    // conditions both g and d have something for create
    if (data.createGenre) {
      const genres = data.createGenre
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== '');

      for (const genre of genres) {
        const id = await createGenre(genre);
        data.genre.push(id[0].id);
      }
    }
    if (data.createDeveloper) {
      const developers = data.createDeveloper
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== '');

      for (const developer of developers) {
        const id = await createDeveloper(developer);
        data.developer.push(id[0].id);
      }
    }
    // create Game
    const gameId = await createGame(data);
    // create link to game id
    for (const developer of data.developer) {
      await createDeveloperGame(gameId[0].id, developer);
    }
    for (const genre of data.genre) {
      await createGenreGame(gameId[0].id, genre);
    }

    await res.redirect('/game');
  },
];
