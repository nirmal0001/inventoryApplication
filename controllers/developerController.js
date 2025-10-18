const { getAllDeveloper, deleteDeveloper } = require('../db/queries');
const { param, validationResult, matchedData } = require('express-validator');

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

exports.deleteDeveloper = [
  idValidator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.array());
    }
    const id = matchedData(req).id;
    await deleteDeveloper(id);
    res.redirect('/developer');
  },
];
