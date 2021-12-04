import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, postVideogames } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_CreateVideogame.module.scss";

function validate(input) {
  const errors = {};
  if (!input.name.trim()) {
    errors.name = "A name is required";
  }
  if (!input.description.trim()) {
    errors.description = "A description is required";
  }
  if (!input.released.trim()) {
    errors.released = "The release date is required";
  }
  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
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
  function handleDeletePlatform(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== e),
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
  }
  function handleSelectPlatform(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }
  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogames(input));
      alert("Your videogame has been created");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
    } else {
      alert("Your videogame couldn't be created");
      return;
    }
  }

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button className={styles.buttonBack}>Back</button>
      </Link>
      <main className={styles.container}>
        <h1 className={styles.title}>Create your own videogame</h1>

        <div className={styles.formBgImg}></div>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Name
            </label>
            <input
              required
              className={styles.formInput}
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <h4>{errors.name}</h4>}
          </div>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Description
            </label>
            <textarea
              className={`${styles.formInput} ${styles.formInputTextarea}`}
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && <h4>{errors.description}</h4>}
          </div>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Release date
            </label>
            <input
              className={styles.formInput}
              type="date"
              name="released"
              value={input.released}
              onChange={(e) => handleChange(e)}
            />
            {errors.released && <h4>{errors.released}</h4>}
          </div>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Rating
            </label>
            <input
              className={styles.formInput}
              type="number"
              name="rating"
              value={input.rating}
              min="0"
              max="5"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Platforms
            </label>
            <select onChange={(e) => handleSelectPlatform(e)}>
              {platforms.map((v) => (
                <option value={v.name}>{v.name}</option>
              ))}
            </select>

            {input.platforms.map((g) => (
              <div className={styles.formList}>
                <p className={styles.formText}>{g}</p>
                <button onClick={() => handleDeletePlatform(g)}>X</button>
              </div>
            ))}
          </div>
          <div className={styles.formDiv}>
            <label className={styles.formLabel} htmlFor="">
              Genres
            </label>
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
            <div className={styles.formList}>
              <p className={styles.formText}>{g}</p>
              <button onClick={() => handleDelete(g)}>X</button>
            </div>
          ))}
          <button className={styles.button} type="submit">
            Create Videogame
          </button>
        </form>
      </main>
    </div>
  );
}
