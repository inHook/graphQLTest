import {
    INCREMENT,
    DECREMENT,
    CHANGE_THEME,
    DISABLE_BUTTONS,
    ENABLE_BUTTONS,
} from "./types";

export const increment = () => ({
    type: INCREMENT,
});

export const decrement = () => ({
    type: DECREMENT,
});

export const changeTheme = theme => ({
    type: CHANGE_THEME,
    payload: theme,
});

export const disableButtons = () => ({
    type: DISABLE_BUTTONS,
});

export const enableButtons = () => ({
    type: ENABLE_BUTTONS,
});

export const asyncIncrement = () => {
    return function (dispatch) {
        dispatch(disableButtons());

        setTimeout(() => {
            dispatch(increment());
            dispatch(enableButtons());
        }, 1500)
    }
};