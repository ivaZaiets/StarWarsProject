import cn from "classnames";
import styles from "./CharactersPagination.module.scss"

type Props = {
    totalPosts: number,
    postsPerPage: number,
    setCurrentPage: (value: number) => void,
    currentPage: number;
}

export const CharactersPagination: React.FC<Props> = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {pages.map((page) => (
                <div
                    key={page}
                    className={cn(styles.pagination__button_background, {
                        [styles.pagination__button_background_active]: page === currentPage
                    })}
                >
                    <button
                        className={cn(styles.pagination__button, {
                            [styles.pagination__button_active]: page === currentPage
                        })}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                </div>
            ))}
        </div>
    )
}