import React from "react";
import { Link } from "react-router-dom";
import fondo from "../video/fondo.mp4";
import styles from "./LandingPage.module.scss";
export default function LandingPage() {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src={fondo} type="video/mp4" />
      </video>
      <div className={styles.container}>
        <h1 className={styles.title}>Do you wanna play a game?</h1>
        <Link to="/home">
          <button className={styles.buttons}>Let's go</button>
        </Link>
      </div>
    </div>
  );
}
