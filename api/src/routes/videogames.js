const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=5e5aee42f09f4d5097d4961db97b5989`
  );
  const apiInfo = await apiUrl.data.results.map((v) => {
    return {
      id: v.id,
      name: v.name,
      img: v.background_image,
      description: v.description,
      released: v.released,
      rating: v.rating,
      platforms: v.platforms,
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
      : res.status(404).send("No se ha encontrado el videojuego");
  } else {
    res.status(200).send(allVideogames);
  }
});
module.exports = router;
