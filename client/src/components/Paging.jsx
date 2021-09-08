export default function Paging({ videogamesPerPage, allVideogames, paging }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paging">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="number">
              <a onClick={() => paging(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
