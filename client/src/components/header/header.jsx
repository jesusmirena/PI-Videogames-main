import React from 'react'
import styles from "./Header.module.scss";

const Header = ({title}) =>{
    return(
        <header className={styles.headerFondo}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.text}>Discover all the games.</p>
                </div>
            </div>
        </header>
    );
}
export default Header