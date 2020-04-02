import {combineReducers} from "redux";

import {
    INCREMENT,
    DECREMENT,
    CHANGE_THEME,
    ENABLE_BUTTONS,
    DISABLE_BUTTONS,
} from "./types";

const counterInitialState = {
    value: 0,
};

const counterReducer = (state = counterInitialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1,
            };

        case DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            };

        default:
            return state;
    }
};

const themesInitialState = {
    theme: "light",
    disableButtons: false,
};

const themesReducer = (state = themesInitialState, action) => {
    switch (action.type) {
        case ENABLE_BUTTONS:
            return {
                ...state,
                disableButtons: false,
            };

        case DISABLE_BUTTONS:
            return {
                ...state,
                disableButtons: true,
            };

        case CHANGE_THEME:
            if (action.payload === "light") {
                return {
                    ...state,
                    theme: "dark",
                }
            }

            return {
                ...state,
                theme: "light",
            };

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    counterReducer,
    themesReducer,
});