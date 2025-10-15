require('dotenv').config();
const { Client } = require('pg');

const query = `
CREATE TABLE IF NOT EXISTS genre (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS developer (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS game (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    poster_url TEXT,
    platform VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS game_genres (
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE IF NOT EXISTS game_developers (
    game_id BIGINT REFERENCES game(id) ON DELETE CASCADE,
    developer_id BIGINT REFERENCES developer(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, developer_id)
);
-- GENRES
INSERT INTO genre (name) VALUES
('Action'),
('Adventure'),
('RPG'),
('Shooter'),
('Simulation'),
('Sports'),
('Strategy');

-- DEVELOPERS
INSERT INTO developer (name) VALUES
('FromSoftware'),
('CD Projekt Red'),
('Rockstar Games'),
('Ubisoft'),
('Nintendo'),
('Valve'),
('EA Sports');

-- GAMES
INSERT INTO game (name, description, poster_url, platform) VALUES
('Elden Ring',
 'An expansive action RPG set in a dark fantasy world created by FromSoftware and George R.R. Martin.',
 'https://image.api.playstation.com/vulcan/ap/rnd/202111/0404/1ZqP0pF5p6ErzFWrR5m9fK6C.png',
 'PC'),
('Cyberpunk 2077',
 'An open-world RPG set in the futuristic city of Night City, where you play as V, a mercenary outlaw.',
 'https://cdn.cdprojektred.com/cp2077/images/cover-1920-en.jpg',
 'PC'),
('Grand Theft Auto V',
 'An open-world action-adventure game set in Los Santos, allowing you to play as three criminals in a sprawling city.',
 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
 'PC'),
('Assassin''s Creed Valhalla',
 'Live the saga of Eivor, a Viking raider who fights for glory in the dark ages of England.',
 'https://upload.wikimedia.org/wikipedia/en/a/a7/Assassin%27s_Creed_Valhalla_cover.jpg',
 'PC'),
('The Legend of Zelda: Breath of the Wild',
 'Explore a vast open world as Link and uncover the mysteries of the fallen kingdom of Hyrule.',
 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
 'Nintendo Switch'),
('Counter-Strike 2',
 'The next evolution of the legendary competitive shooter, rebuilt on the Source 2 engine.',
 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
 'PC'),
('FIFA 24',
 'The world’s game — realistic football gameplay by EA Sports FC 24.',
 'https://upload.wikimedia.org/wikipedia/en/8/80/EA_Sports_FC_24_cover.jpg',
 'PC');

-- GAME ↔ GENRE links
INSERT INTO game_genres (game_id, genre_id) VALUES
(1, 1), (1, 3),     -- Elden Ring: Action, RPG
(2, 1), (2, 3), (2, 4), -- Cyberpunk 2077: Action, RPG, Shooter
(3, 1), (3, 2),     -- GTA V: Action, Adventure
(4, 1), (4, 2), (4, 3), -- Assassin’s Creed Valhalla: Action, Adventure, RPG
(5, 2), (5, 3),     -- Zelda: Adventure, RPG
(6, 4),             -- CS2: Shooter
(7, 6);             -- FIFA 24: Sports

-- GAME ↔ DEVELOPER links
INSERT INTO game_developers (game_id, developer_id) VALUES
(1, 1),             -- Elden Ring → FromSoftware
(2, 2),             -- Cyberpunk 2077 → CD Projekt Red
(3, 3),             -- GTA V → Rockstar Games
(4, 4),             -- AC Valhalla → Ubisoft
(5, 5),             -- Zelda → Nintendo
(6, 6),             -- CS2 → Valve
(7, 7);             -- FIFA 24 → EA Sports

`;

async function makeDb() {
  console.log('initiating db creation');
  const client = new Client({ connectionString: process.env.connectionString });

  await client.connect();
  await client.query(query);
  await client.end();
  console.log('db created');
}

makeDb();
