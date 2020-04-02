import React, {useState} from 'react';
import {compose} from 'recompose';
import {graphql} from 'react-apollo';

import {addDirectorMutation} from './mutations';
import {directorsQuery} from "./queries";
import "./style.css";

const DirectorsRender = ({data, addDirector}) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const directors = data?.directors || [];

    const addDirectorToDB = () => {
        if (name && age) {
            addDirector({
                name,
                age: Number(age),
            })
        } else {
            console.error("не все поля")
        }
    };

    if (!directors.length) {
        return null;
    }

    return (
        <div className="movies">
            <table className="movies__table">
                <tbody>
                <tr>
                    <td><b>Имя режиссёра</b></td>
                    <td><b>Возраст</b></td>
                    <td><b>Функции</b></td>
                </tr>
                {directors.map(director => (
                    <tr key={director.id}>
                        <td>{director.name}</td>
                        <td>{director.age}</td>
                        <td>
                            <button>Удалить</button>
                            <button>Редиктировать</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="movies__add">
                <input
                    type="text"
                    placeholder="Имя"
                    className="movies__input"
                    onChange={event => setName(event.target.value)}
                />

                <input
                    type="number"
                    min={1}
                    max={100}
                    placeholder="Возраст"
                    className="movies__input"
                    onChange={event => setAge(event.target.value)}
                />
                <button className="movies__button" onClick={addDirectorToDB}>Сохранить</button>
            </div>
        </div>)
};

const withGraphqlAdd = graphql(addDirectorMutation, {
    props: ({mutate}) => ({
        addDirector: director => mutate({
            variables: director,
            refetchQueries: [{
                query: directorsQuery
            }]
        })
    })
});

export const Directors = compose(withGraphqlAdd, graphql(directorsQuery))(DirectorsRender);