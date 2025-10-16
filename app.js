const express = require('express');
const path = require('node:path');
const app = express();

// setup ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup body and static
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
const homeRouter = require('./routes/homeRouter');
// const genreRouter = require('./routes/genreRouter');
// const gameRouter = require('./routes/gameRouter');
// const developerRouter = require('./routes/developerRouter');
app.use('/', homeRouter);
// app.use('/genre', genreRouter);
// app.use('/game', gameRouter);
// app.use('/developer', developerRouter);

// app run

const PORT = process.env.PORT || 8098;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`app is running on port ${PORT}`);
  }
});
