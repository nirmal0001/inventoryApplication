const pool = require('../db/pool');

// CREATE
async function createGenre(genreName) {
  const { rows } = await pool.query(
    'INSERT INTO genre (name) VALUES ($1) RETURNING id',
    [genreName]
  );
  return rows;
}

async function createGenreGame(gameId, genreId) {
  await pool.query(
    'INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)',
    [gameId, genreId]
  );
}

async function createDeveloper(developerName) {
  const { rows } = await pool.query(
    'INSERT INTO developer (name) VALUES ($1) RETURNING id',
    [developerName]
  );
  return rows;
}

async function createDeveloperGame(gameId, developerId) {
  await pool.query(
    'INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)',
    [gameId, developerId]
  );
}

async function createGame(name, description, poster_url, platform) {
  const { rows } = await pool.query(
    'INSERT INTO game (name, description, poster_url, platform) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, description, poster_url, platform]
  );
  return rows;
}

// READ
async function getAllGenre() {
  const { rows } = await pool.query('SELECT * FROM genre');
  return rows;
}

async function getGamesFromGenre(genreId) {
  const { rows } = await pool.query(
    'SELECT g.* FROM game g JOIN game_genres gg ON g.id = gg.game_id WHERE gg.genre_id = $1',
    [genreId]
  );
  return rows;
}

async function getAllDeveloper() {
  const { rows } = await pool.query('SELECT * FROM developer');
  return rows;
}
async function getGamesFromDeveloper(developerId) {
  const { rows } = await pool.query(
    'SELECT g.* FROM game g JOIN game_developers gd ON g.id = gd.game_id WHERE gd.developer_id = $1',
    [developerId]
  );
  return rows;
}

async function getGame(gameId) {
  const { rows } = await pool.query('SELECT * FROM game WHERE id = $1', [
    gameId,
  ]);
  return rows;
}

// UPDATE
async function updateGenre(id, genreName) {
  await pool.query('UPDATE genre SET name = $2 WHERE id = $1', [id, genreName]);
}

async function updateDeveloper(id, developerName) {
  await pool.query('UPDATE developer SET name = $2 WHERE id = $1', [
    id,
    developerName,
  ]);
}

async function updateGame(id, name, description, poster_url, platform) {
  await pool.query(
    'UPDATE game SET name = $2, description = $3, poster_url = $4, platform = $5 WHERE id = $1',
    [id, name, description, poster_url, platform]
  );
}

// DELETE
async function deleteGenre(id) {
  await pool.query('DELETE FROM genre WHERE id = $1', [id]);
}

async function deleteDeveloper(id) {
  await pool.query('DELETE FROM developer WHERE id = $1', [id]);
}

async function deleteGame(id) {
  await pool.query('DELETE FROM game WHERE id = $1', [id]);
}

module.exports = { getAllGenre, deleteGenre, getAllDeveloper, deleteDeveloper };
