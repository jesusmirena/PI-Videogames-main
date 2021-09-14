const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platforms } = require("../db");

const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.results.map((v) => {
    const plataformas = v.platforms.map(g => g.platform)
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
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
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
      : res.status(200).json({ alert: "Your game hasn't been found" });
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
    plataformas.forEach(async(v)=>{
      await Platforms.findOrCreate({
        where: {
          name: v.name,
        }
      })
    })
    const platformsDataBase = await Platforms.findAll();
    res.json(platformsDataBase);
  } catch (err) {
    res.send(err);
  }
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

//videogame

router.post("/videogame", async (req, res) => {
  let { name, description, released, rating, platforms, genres } = req.body;
  let createVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
  });
  let DbGenre = await Genre.findAll({
    where: { name: genres },
  });
  createVideogame.addGenres(DbGenre);
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
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      return res.json(dbGame);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

module.exports = router;
