import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, postVideogames } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required";
  }
  if (!input.description) {
    errors.description = "A description is required";
  }
  if (!input.released) {
    errors.released = "The release date is required";
  }
  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleCheckbox(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: e.target.value,
      });
    }
  }
  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogames(input));
    alert("Your videogames has been created");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your own videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>
        <div>
          <label htmlFor="">Description</label>
          <textarea
            type="textarea"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          ></textarea>
          {errors.description && <h4>{errors.description}</h4>}
        </div>
        <div>
          <label htmlFor="">Release date</label>
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={(e) => handleChange(e)}
          />
          {errors.released && <h4>{errors.released}</h4>}
        </div>
        <div>
          <label htmlFor="">Rating</label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            min="0"
            max="5"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>
            <input
              onChange={(e) => handleCheckbox(e)}
              type="checkbox"
              name="platforms"
              value="PS5"
            />
            PS5
          </label>
          <label>
            <input
              name="platforms"
              onChange={(e) => handleCheckbox(e)}
              type="checkbox"
              value="Nintendo"
            />
            Nintendo
          </label>
          <label>
            <input
              name="platforms"
              onChange={(e) => handleCheckbox(e)}
              type="checkbox"
              value="Pc"
            />
            PC
          </label>
          <label>
            <input
              name="platforms"
              onChange={(e) => handleCheckbox(e)}
              type="checkbox"
              value="Xbox"
            />
            Xbox
          </label>
          <label>
            <input
              name="platforms"
              onChange={(e) => handleCheckbox(e)}
              type="checkbox"
              value="PS4"
            />
            PS4
          </label>
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)} name="genres">
            <option selected={true} disabled="disabled" value="">
              Choose a genre
            </option>
            {genres &&
              genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
          </select>
        </div>
      {input.genres.map((g) => (
        <div>
          <p>{g}</p>
          <button onClick={() => handleDelete(g)}>X</button>
        </div>
      ))}
        <button type="submit">Create Videogame</button>
      </form>
    </div>
  );
}
