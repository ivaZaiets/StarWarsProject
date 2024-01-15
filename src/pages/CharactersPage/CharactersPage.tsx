import { useEffect, useState } from "react"
import styles from "./CharactersPage.module.scss"
import { NavLink, useSearchParams } from "react-router-dom"
import { CharactersFilters } from "../../components/CharactersFilters/CharactersFilters"
import { CharactersPagination } from "../../components/CharactersPagination/CharactersPagination"
import { SquareLoader } from "react-spinners"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getMoviesThunk } from "../../thunks/MoviesThunk"
import { getAllCharactersThunk } from "../../thunks/AllCharactersThunk"

export const CharactersPage = () => {
    const dispatch = useAppDispatch();
    const { movies } = useAppSelector(state => state.movies);
    const { characters } = useAppSelector(state => state.characters);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('name') || '';
    const movieUrl = searchParams.get('movie') || '';
    const genders = searchParams.getAll('gender') || [];
    const maxMass = +(searchParams.get('maxMass') || 0);
    const minMass = +(searchParams.get('minMass') || 0);

    const normalizedQuery = query.toLowerCase().trim();

    const filteredCharacters = characters.filter(character => (
        (movieUrl ? character.films.includes(movieUrl) : characters) &&
        character.name.toLowerCase().includes(normalizedQuery) &&
        (genders.length !== 0 ? genders.includes(character.gender) : characters) &&
        ((maxMass ? +character.mass <= maxMass : characters) &&
            (minMass ? +character.mass >= minMass : characters))
    ))

    const currentPosts = filteredCharacters.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        dispatch(getAllCharactersThunk('https://swapi.dev/api/people'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getMoviesThunk());
    }, [dispatch])

    return (
        <>
            {characters.length !== 0 && movies.length !== 0 ? (
                <div className={styles.container}>
                    <div className={styles.filters}>
                        <CharactersFilters
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            query={query}
                            genders={genders}
                            maxMass={maxMass}
                            minMass={minMass}
                            movieUrl={movieUrl}
                            movies={movies}
                        />
                    </div>
                    <div className={styles.ch_wrapper}>
                        {currentPosts.map((character) => (
                            <NavLink
                                key={character.url}
                                to={`./${character.id}`}
                                className={styles.ch_wrapper_character}
                            >
                                <img
                                    className={styles.ch_wrapper_character_logo}
                                    src="../../../public/img/card-logo.svg"
                                    alt="star wars logo"
                                />
                                <h1 className={styles.ch_wrapper_character_name}>{character.name}</h1>
                                <div className={styles.ch_wrapper_character_details}>
                                    <div className={styles.ch_wrapper_character_details_gender}>
                                        Gender: <p>{character.gender}</p>
                                    </div>
                                    <div className={styles.ch_wrapper_character_details_height}>
                                        Height: <p>{character.height}</p>
                                    </div>
                                    <div className={styles.ch_wrapper_character_details_mass}>
                                        Mass: <p>{character.mass}</p>
                                    </div>
                                    <div className={styles.ch_wrapper_character_details_birth}>
                                        Birth Year: <p>{character.birth_year}</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <CharactersPagination
                            totalPosts={
                                filteredCharacters.length === 0 && !genders.includes('unknown') ?
                                    characters.length :
                                    filteredCharacters.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
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