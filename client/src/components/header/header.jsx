import React from "react";

import styles from "./Header.module.scss";
import NavHeader from "./NavHeader";

const Header = ({ title }) => {
  return (
      <header className={styles.headerFondo}>
      <div className={styles.container}>
        <NavHeader/>
      <div className={styles.content}> 
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.text}>Discover all the games.</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
