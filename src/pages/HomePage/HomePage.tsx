import { NavLink } from "react-router-dom"
import styles from "./HomePage.module.scss"

export const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.stars}></div>
            <div className={styles.detail_top}></div>

            <div className={styles.content}>
                <div className={styles.content__description}>
                    <h1 className={styles.content__description_title}>
                        Welcome to the world of Star Wars!
                    </h1>
                    <p className={styles.content__description_paragraph}>
                        Ready to choose your favorite character?
                    </p>
                    <NavLink
                        to={"/characters"}
                        className={styles.content__description_btn_background}
                    >
                    </NavLink>
                </div>

                <img
                    className={styles.content__character}
                    src="./img/baby-yoda.png"
                    alt="baby yoda"
                />

                <img
                    className={styles.character_background}
                    src="./img/baby-yoda-background.png"
                    alt="baby yoda background"
                />
            </div>
        </div>
    )
}