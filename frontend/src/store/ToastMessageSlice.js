import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: null,
    message: null,
    timeoutId: null,
};

export const postMessageAction = createAsyncThunk(
    "toastMessageSlice/postMessage",
    (payload, { dispatch, getState }) => {
        const currentTimeoutId = getState().toastMessage.timeoutId;
        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }
        const timeoutId = setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);

        dispatch(addMessage({ ...payload, timeoutId }));

        return true;
    }
);

const ToastMessageSlice = createSlice({
    name: "toastMessageSlice",
    initialState,
    reducers: {
        addMessage(state, { payload }) {
            state.type = payload.type;
            state.message = payload.message;
            state.timeoutId = payload.timeoutId;
        },
        removeMessage(state) {
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
            state.type = null;
            state.message = null;
            state.timeoutId = null;
        },
    },
});

export const { addMessage, removeMessage } = ToastMessageSlice.actions;
export default ToastMessageSlice;
