const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");

const router = Router();

const getApiInfo = async () => {
  var games = [];
  const apiUrl1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  const apiUrl2 = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const apiUrl3 = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const apiUrl4 = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const apiUrl5 = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );

  return Promise.all([apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5])
    .then((resolve) => {
      let [apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5] = resolve;

      games = [
        ...apiUrl1.data.results,
        ...apiUrl2.data.results,
        ...apiUrl3.data.results,
        ...apiUrl4.data.results,
        ...apiUrl5.data.results,
      ].map((v) => {
        const plataformas = v.platforms.map((g) => g.platform);
        return {
          id: v.id,
          name: v.name,
          img: v.background_image,
          description: v.description,
          released: v.released,
          rating: v.rating,
          platforms: plataformas,
          genres: v.genres,
        };
      });
      return games;
    })
    .catch((err) => console.log(err));
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: [Genre, Platform],
  });
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const info = apiInfo.concat(dbInfo);
  return info;
};

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  let allVideogames = await getAllVideogames();
  if (name) {
    let videogameName = await allVideogames.filter((v) =>
      v.name.toLowerCase().includes(name.toLowerCase())
    );
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Your game hasn't been found");
  } else {
    res.status(200).send(allVideogames);
  }
});

router.get("/platforms", async (req, res) => {
  try {
    const platformsApi = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const plataformas = platformsApi.data.results;

    // plataformas.forEach(async (v) => {
    //   await Platform.findOrCreate({
    //     where: {
    //       name: v.name,
    //     },
    //   });
    // });
    // const platformsDataBase = await Platform.findAll();
    res.json(plataformas);
  } catch (err) {
    res.send(err);
  }
});
//filter by platform
router.get("/platforms/:id", async (req, res) => {
  const { id } = req.params;
  const gamesByPlatform = await axios.get(
    `https://api.rawg.io/api/games?platforms=${id}&key=${API_KEY}`
  );
  const info = gamesByPlatform.data.results;

  const mapeados = info?.map((v) => {
    const plataformas = v.platforms.map((g) => g.platform);
    return {
      id: v.id,
      name: v.name,
      img: v.background_image,
      description: v.description,
      released: v.released,
      rating: v.rating,
      platforms: plataformas,
      genres: v.genres,
    };
  });

  return res.json(mapeados);
});

//Genres

router.get("/genres", async (req, res) => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genres = genresApi.data.results;
  genres.forEach(async (g) => {
    await Genre.findOrCreate({
      where: {
        name: g.name,
      },
    });
  });
  const allGenres = await Genre.findAll();
  res.status(200).send(allGenres);
});

//Filter by Genre
router.get("/genres/:name", async (req, res) => {
  const { name } = req.params;
  const gamesByGenre = await axios.get(
    `https://api.rawg.io/api/games?genres=${name}&key=${API_KEY}`
  );
  const info = gamesByGenre.data.results;

  const mapeados = info?.map((v) => {
    const plataformas = v.platforms.map((g) => g.platform);
    return {
      id: v.id,
      name: v.name,
      img: v.background_image,
      description: v.description,
      released: v.released,
      rating: v.rating,
      platforms: plataformas,
      genres: v.genres,
    };
  });

  return res.json(mapeados);
});

//videogame

router.post("/videogame", async (req, res) => {
  let { name, description, released, rating, platforms, genres } = req.body;
  let createVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
  });
  let DbGenre = await Genre.findAll({
    where: { name: genres },
  });
  let dbPlatform = await Platform.findAll({
    where: { name: platforms },
  });
  createVideogame.addGenres(DbGenre);
  createVideogame.addPlatforms(dbPlatform);
  res.status(200).send(createVideogame);
});

router.get("/videogame/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length < 10) {
      const game = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      return res.json(game.data);
    }
    if (id.length > 10) {
      const dbGame = await Videogame.findOne({
        where: {
          id: id,
        },
        include: [Genre, Platform],
      });
      return res.json(dbGame);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

module.exports = router;
