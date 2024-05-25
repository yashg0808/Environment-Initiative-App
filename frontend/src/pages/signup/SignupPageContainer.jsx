import { useEffect } from "react";
import useCustomNavigate from "../../protectedRoutes/useCustomNavigate";
import { useAppSelector } from "../../store";
import SignupPage from "./SignupPage";


const SignupPageContainer = () => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useCustomNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate("/", true);
        }
    }, [isLoggedIn, navigate])
    
    return (
        <SignupPage />
    )
}

export default SignupPageContainer;