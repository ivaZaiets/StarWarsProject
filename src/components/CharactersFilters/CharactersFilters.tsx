import { ChangeEvent, useState } from "react"
import { Movie } from "../../types/Movie"
import styles from "./CharactersFilters.module.scss"
import cn from "classnames"
import Select, { CSSObjectWithLabel } from "react-select"
import { Option } from "../../types/Option"
import { NavLink } from "react-router-dom"

type Props = {
    searchParams: URLSearchParams,
    setSearchParams: (value: URLSearchParams) => void,
    setCurrentPage: (value: number) => void,
    query: string,
    genders: string[],
    maxMass: number,
    minMass: number,
    movieUrl: string,
    movies: Movie[],
}

export const CharactersFilters: React.FC<Props> = ({
    searchParams,
    setSearchParams,
    setCurrentPage,
    query,
    genders,
    maxMass,
    minMass,
    movieUrl,
    movies,
}) => {
    const [minMassValue, setMinMassValue] = useState(false);
    const [maxMassValue, setMaxMassValue] = useState(false);

    const params = new URLSearchParams(searchParams);

    const handleSetSearchParams = (
        event: ChangeEvent<HTMLInputElement> |
            ChangeEvent<HTMLSelectElement>,
        searchParam: string
    ) => {
        if (event.target.value !== '') {
            params.set(searchParam, event.target.value);
        } else {
            params.delete(searchParam)
        }

        setSearchParams(params);
    }

    const handleSetSearchParamsArray = (gender: string) => {
        const newGenders = genders.includes(gender) ?
            genders.filter(g => g !== gender) :
            [...genders, gender]
        params.delete('gender')
        newGenders.forEach(gender => params.append('gender', gender))
        setSearchParams(params)
    }

    const options = movies.map((movie) => ({
        value: movie.url,
        label: movie.title,
        color: 'black',
    }))

    const handleSelectChange = (selectedOption: Option | null) => {
        if (selectedOption) {
            params.set('movie', selectedOption.value);
        }

        setSearchParams(params);
    }

    const selectedOption = options.find(option => option.value === movieUrl) || null;

    return (
        <>
            <div className={styles.filters}>
                <div className={styles.filters__block1}>
                    <div className={styles.filters__block1_genders}>
                        {['male', 'female', 'unknown', 'n/a'].map((gender) => (
                            <>
                                {gender}: <div
                                    key={gender}
                                    className={cn(
                                        styles.filters__block1_genders_item_bg, {
                                        [styles.filters__block1_genders_item_bg_checked]:
                                            genders.includes(gender)
                                    }
                                    )}>
                                    <input
                                        className={styles.filters__block1_genders_item}
                                        checked={genders.includes(gender)}
                                        type="radio"
                                        onClick={() => {
                                            handleSetSearchParamsArray(gender);
                                            setCurrentPage(1);
                                        }} 
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                    <div className={styles.filters__block1_name_field}>
                        <input
                            type="text"
                            placeholder="Choose a character name"
                            value={query}
                            onChange={(event) => {
                                handleSetSearchParams(event, 'name');
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                </div>

                <div className={styles.filters__block2}>
                    <div className={styles.filters__block2_movies}>
                        <div className={styles.filters__block2_movies_select}>
                            <Select
                                classNamePrefix='custom_select'
                                options={options}
                                onChange={(option) => {
                                    handleSelectChange(option);
                                    setCurrentPage(1);
                                }}
                                value={selectedOption}
                                placeholder="Select a movie"
                                styles={{
                                    noOptionsMessage:
                                        (styles: CSSObjectWithLabel) => ({
                                            ...styles,
                                            color: 'rgba(255, 255, 255, 0.479)',
                                            marginRight: '10px',
                                            fontSize: '18px',
                                            letterSpacing: '0.8px'
                                        })
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.filters__block2_reset_btn_background}>
                        <NavLink
                            className={styles.filters__block2_reset_btn}
                            to={{ search: '' }}
                        >
                            Reset
                        </NavLink>
                    </div>

                    <div className={styles.filters__block2_mass}>
                        <div className={styles.filters__block2_mass_min}>
                            <p className={cn(styles.filters__block2_mass_min_placeholder, {
                                [styles.filters__block2_mass_min_placeholder_none]: minMassValue
                            })}>
                                Min Mass
                            </p>
                            <input
                                className={cn(styles.filters__block2_mass_min_input, {
                                    [styles.filters__block2_mass_min_input_visible]: minMassValue
                                })}
                                type="text"
                                value={minMass}
                                onChange={(event) => {
                                    handleSetSearchParams(event, 'minMass');
                                    setMinMassValue(true);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <div className={styles.filters__block2_mass_max}>
                            <p className={cn(styles.filters__block2_mass_max_placeholder, {
                                [styles.filters__block2_mass_max_placeholder_none]: maxMassValue
                            })}>
                                Max Mass
                            </p>
                            <input
                                className={cn(styles.filters__block2_mass_max_input, {
                                    [styles.filters__block2_mass_max_input_visible]: maxMassValue
                                })}
                                type="text"
                                value={maxMass}
                                onChange={(event) => {
                                    handleSetSearchParams(event, 'maxMass');
                                    setMaxMassValue(true);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}