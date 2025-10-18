const { getAllGenre, deleteGenre } = require('../db/queries');
const { param, validationResult, matchedData } = require('express-validator');

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
      console.log(result.array());
    }
    const id = matchedData(req).id;
    await deleteGenre(id);
    res.redirect('/genre');
  },
];
