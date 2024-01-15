import styles from "./CharacterPage.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getStarshipsThunk } from "../../thunks/StarshipsThunk";
import { getSpeciesThunk } from "../../thunks/SpeciesThunk";
import { SquareLoader } from "react-spinners";

export const CharacterPage = () => {

    const dispatch = useAppDispatch();

    const { characters } = useAppSelector(state => state.characters);
    const { movies } = useAppSelector(state => state.movies);
    const { starships } = useAppSelector(state => state.starships);
    const { species } = useAppSelector(state => state.species);

    const { characterId } = useParams();
    const id = characterId ? +characterId : 0;

    useEffect(() => {
        dispatch(getStarshipsThunk())
        dispatch(getSpeciesThunk())
    }, [dispatch])


    const character = characters.find(character => character.id === id)

    const characterMovies = movies.filter(movie => (
        character?.films.includes(movie.url)
    ))

    const characterStarship = starships.filter((starship) => (
        character?.starships.includes(starship.url)
    ))

    const characterSpecies = species.filter((specie) => (
        character?.species.includes(specie.url)
    ))

    return (
        <>
            {characters.length !== 0 ? (
                <div className={styles.character}>
                    <div className={styles.character__background}>
                        <div className={styles.character__center}>
                            <img
                                className={styles.character__center_image}
                                src="./img/character-shadow.svg"
                                alt="shadow of the character"
                            />
                        </div>

                        <div className={styles.character__left_side}>
                            <p className={styles.character__left_side_label_name}>Name</p>
                            <h1 className={styles.character__left_side_name}>
                                {character?.name}
                            </h1>
                        </div>

                        <div className={styles.character__right_side}>
                            <p className={styles.character__right_side_label_species}>Species</p>
                            {characterSpecies.length !== 0 ? (
                                characterSpecies.map((specie) => (
                                    <div className={styles.character__right_side_species} key={specie.homeworld}>
                                        <p className={styles.character__right_side_species_item}>
                                            {specie.homeworld}
                                        </p>
                                        <p className={styles.character__right_side_species_item}>
                                            {specie.language}
                                        </p>
                                        <p className={styles.character__right_side_species_item}>
                                            {specie.classification}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.character__no_results}>No results</p>
                            )}

                            <p className={styles.character__right_side_label_movies}>Movies</p>
                            {characterMovies.length !== 0 ? (
                                characterMovies.map((movie) => (
                                    <div className={styles.character__right_side_movies}>
                                        <p className={styles.character__right_side_movies_item}>
                                            {movie.title}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.character__no_results}>No results</p>
                            )}

                            <p className={styles.character__right_side_label_starships}>Starships</p>

                            {characterStarship.length !== 0 ? (
                                characterStarship.map((starship) => (
                                    <div className={styles.character__right_side_starships}>
                                        <p className={styles.character__right_side_starships_item}>
                                            {starship.name}
                                        </p>
                                        <p className={styles.character__right_side_starships_item}>
                                            {starship.model}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.character__no_results}>No results</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loader}>
                    <SquareLoader
                        size='80'
                        color="rgb(207, 157, 47)"
                    />
                </div>
            )}
        </>
    )
}