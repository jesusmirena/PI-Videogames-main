import styles from "./Pagination.module.scss"

export default function Pagination({ videogamesPerPage, allVideogames, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} >
              <a className={`${styles.number} ${styles.bar}`} onClick={() => pagination(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
