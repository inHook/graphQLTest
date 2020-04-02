import React from 'react';
import {connect} from "react-redux";

import {
    getIsDisableButtons,
    getCounter,
    getTheme,
} from "./store/selectors";
import {MoviesConnected} from "./components/movies";
import {Directors} from "./components/directors";
import {COVID19} from "./components/covid19";
import {increment, decrement, asyncIncrement, changeTheme} from "./store/actionCreators";
import './App.css';
import './bootstrap.css';

const App = ({counter, increment, decrement, asyncIncrement, changeTheme, theme, disableButtons}) => (
    <div className={`wrapper ${theme}`}>
        <div className="container pt-5">
            <h1 className="heading">
                <span>GraphQL & MongoDB self learning</span>
                <button disabled={disableButtons} className="btn btn-info" id="theme"
                        onClick={() => changeTheme(theme)}>Сменить тему
                </button>
            </h1>

            <hr />

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Счетчик:
                        <span id="counter">{counter}</span>
                    </h5>
                    <button
                        disabled={disableButtons}
                        className="btn btn-primary" id="add"
                        onClick={increment}
                    >
                        Добавить
                    </button>
                    <button
                        disabled={disableButtons}
                        className="btn btn-danger"
                        id="sub"
                        onClick={decrement}
                    >
                        Убрать
                    </button>
                    <button
                        disabled={disableButtons}
                        className="btn btn-success"
                        id="async"
                        onClick={asyncIncrement}
                    >
                        Async
                    </button>
                </div>
            </div>

            <div className="flex">
                <MoviesConnected />

                <Directors />
            </div>

            <div className="flex">
                <COVID19 />
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    counter: getCounter(state),
    theme: getTheme(state),
    disableButtons: getIsDisableButtons(state),
});

const mapDispatchToProps = {
    increment,
    decrement,
    asyncIncrement,
    changeTheme,
};

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);