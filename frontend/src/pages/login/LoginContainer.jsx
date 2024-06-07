import { useEffect } from "react";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import { useAppSelector } from "../../store";
import Login from "./LoginPage";
import axios from "axios";

const LoginPageContainer = () => {

    const navigate = useCustomNavigate();

    const isLoggedIn = useAppSelector((state) => 
        {
            return state.auth.isLoggedIn;
        }
    );
    /* If the user is logged in navigate to home */
    useEffect(() => {
        console.log(`backend url: ${axios.defaults.baseURL}`)
        if(isLoggedIn){
            navigate("/", false);
        }
        console.log("isLoggedIn:" , isLoggedIn)
    },  [navigate, isLoggedIn])
    return (
        <Login/>
    )
}

export default LoginPageContainer;