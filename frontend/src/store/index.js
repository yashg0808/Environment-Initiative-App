import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AuthSlice from "./AuthSlice";
import ToastMessageSlice from "./ToastMessageSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        toastMessage: ToastMessageSlice.reducer,
    },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

export default store;
