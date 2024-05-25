import { useDispatch } from "react-redux";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AuthService from "../../../services/auth/AuthService";
import ApiError from "../../../services/ApiError";
import { logIn } from "../../../store/AuthSlice";
import { ROUTE_PATHS } from "../../../constants";
import Login from "./Login";
import ForgotPasswordModalContainer from "../../modals/forgotpasswordmodal/ForgotPasswordModalContainer";

const LoginContainer = () => {
  const navigate = useCustomNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* Forgot Password Modal Visibility */
  const [isForgotPasswordModalShown, setIsForgotPasswordModalShown] =
    useState(false);

  const loginClickHandler = async (inputData) => {
    setIsLoading(true);
    setErrorMessage("");

    const response = await AuthService.loginService(
      inputData.email,
      inputData.password
    );

    setIsLoading(false);

    if (response instanceof ApiError) {
      setErrorMessage(response.errorResponse?.message || response.errorMessage);
    } else {
      // Logged In
      dispatch(logIn(response.user));
      const previousRoute = location.state?.from;
      if (previousRoute) {
        navigate(previousRoute, true);
      } else {
        navigate("/protected");
      }
    }
  };

  /* navigating to /signup */
  const signupClickHandler = () => {
    navigate(ROUTE_PATHS.signup);
  };

  const toggleForgotPasswordModal = () => {
    setIsForgotPasswordModalShown((prev) => !prev);
  };

  return (
    <>
      {isForgotPasswordModalShown && (
        <ForgotPasswordModalContainer hideModal={toggleForgotPasswordModal} />
      )}
      <Login
        loginClickHandler={loginClickHandler}
        // googleLoginClickHandler={googleLoginClickHandler}
        signupClickHandler={signupClickHandler}
        forgotPasswordClickHandler={toggleForgotPasswordModal}
        isLoading={isLoading}
        apiError={errorMessage}
      />
    </>
  );
};

export default LoginContainer;
