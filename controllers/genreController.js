const { getAllGenre } = require('../db/queries');

exports.index = async (req, res) => {
  const data = await getAllGenre();
  res.render('index', {
    title: 'Browse Genre',
    content: 'genre',
    data,
  });
};
