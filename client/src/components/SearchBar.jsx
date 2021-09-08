import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideogames(name));
  }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Search..."
      />
      <button  type="submit">
        Search
      </button>
        </form>
    </div>
  );
}
