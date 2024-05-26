import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AuthSlice from "./AuthSlice";
import ToastMessageSlice from "./ToastMessageSlice";
import BreakpointSlice from "./BreakpointSlice";
import LanguageSlice from "./LanguageSlice";

const store = configureStore({
    reducer: {
        language: LanguageSlice.reducer,
        auth: AuthSlice.reducer,
        toastMessage: ToastMessageSlice.reducer,
        breakpoint: BreakpointSlice.reducer,
    },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

export default store;
