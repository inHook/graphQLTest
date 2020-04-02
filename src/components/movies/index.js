import React, {useState, useRef} from 'react';
import {connect} from "react-redux";

import {getIsDisableButtons} from "../../store/selectors";
import {disableButtons, enableButtons} from "../../store/actionCreators";
import {MoviesWithHoc} from "./graphQlHoc";

export const MoviesRender = ({data, addMovie, deleteMovie, updateMovie, isDisableButtons, disableButtons, enableButtons}) => {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [editElementId, setEditElementId] = useState(null);
    const [requestStatusOk, setRequestStatusOk] = useState(false);
    const [requestStatusError, setRequestStatusError] = useState(false);
    const [searchName, setSearchName] = useState("");
    const movieNameRef = useRef(null);
    const movieGenreRef = useRef(null);
    const movies = data?.movies || [];

    const saveMovie = id => {
        if (id) {
            const name = movieNameRef.current.value;
            const genre = movieGenreRef.current.value;

            updateMovie({
                id,
                name,
                genre,
            })
                .then(() => {
                    setEditElementId(null);
                    enableButtons();
                    setRequestStatusOk(true);

                    setTimeout(() => {
                        setRequestStatusOk(false);
                    }, 2000)
                })
                .catch(error => {
                    setRequestStatusError(true);
                    console.error(error);

                    setTimeout(() => {
                        setRequestStatusError(false);
                    }, 2000)
                })
        } else if (name && genre) {
            addMovie({
                name,
                genre
            })
                .then(() => {
                    setName("");
                    setGenre("");
                })
                .catch(error => {
                    setRequestStatusError(true);
                    console.error(error);

                    setTimeout(() => {
                        setRequestStatusError(false);
                    }, 2000)
                })
        } else {
            console.error("не все поля")
        }
    };

    const deleteMovieFromDB = id => {
        const userConfirmDialog = window.confirm("Удалить?");

        if (userConfirmDialog && id) {
            deleteMovie({id});
        }
    };

    const editMode = id => {
        setEditElementId(id);
        disableButtons();
    };

    const handleSearch = e => {
        const name = e.target.value;

        setSearchName(name);

        data.fetchMore({
            variables: {
                name,
            },
            updateQuery: (previousResult, {fetchMoreResult}) => fetchMoreResult,
        })
    };

    return (
        <>
            {requestStatusOk && (
                <div className="movies__message-status" style={{background: "green"}}>Усшешно</div>
            )}

            {requestStatusError && (
                <div className="movies__message-status" style={{background: "red"}}>Потеряно</div>
            )}

            <div className="movies">
                <input
                    value={searchName}
                    type="text"
                    className="movies__search"
                    onChange={handleSearch}
                />

                {movies.length && (
                    <table className="movies__table">
                        <tbody>
                        <tr>
                            <td><b>Фильм</b></td>
                            <td><b>Жанр</b></td>
                            <td><b>Функции</b></td>
                        </tr>
                        {movies.map(movie => (
                            <tr key={movie.id}>
                                <td>
                                    {editElementId === movie.id ? (
                                        <input
                                            type="text"
                                            className="movies__input"
                                            defaultValue={movie.name}
                                            ref={movieNameRef}
                                        />
                                    ) : (
                                        <span>{movie.name}</span>
                                    )}
                                </td>

                                <td>
                                    {editElementId === movie.id ? (
                                        <input
                                            type="text"
                                            className="movies__input"
                                            defaultValue={movie.genre}
                                            ref={movieGenreRef}
                                        />
                                    ) : (
                                        <span>{movie.genre}</span>
                                    )}
                                </td>

                                <td>
                                    <button
                                        disabled={isDisableButtons}
                                        onClick={() => deleteMovieFromDB(movie.id)}
                                    >
                                        Удалить
                                    </button>

                                    <button
                                        disabled={editElementId !== movie.id && isDisableButtons}
                                        onClick={editElementId === movie.id ? () => saveMovie(movie.id) : () => editMode(movie.id)}
                                    >
                                        {editElementId === movie.id ? "Обновить" : "Редактировать"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <div className="movies__add">
                    <div><span>Добавить новый фильм</span></div>
                    <input
                        value={name}
                        type="text"
                        placeholder="Название фильма"
                        className="movies__input"
                        disabled={isDisableButtons}
                        onChange={event => setName(event.target.value)}
                    />

                    <input
                        value={genre}
                        type="text"
                        placeholder="Жанр"
                        className="movies__input"
                        disabled={isDisableButtons}
                        onChange={event => setGenre(event.target.value)}
                    />

                    <button
                        className="movies__button"
                        disabled={isDisableButtons}
                        onClick={() => saveMovie()}
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    isDisableButtons: getIsDisableButtons(state),
});

const mapDispatchToProps = {
    disableButtons,
    enableButtons,
};

export const Movies = MoviesWithHoc(MoviesRender);

export const MoviesConnected = connect(mapStateToProps, mapDispatchToProps)(Movies);