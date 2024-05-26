
import { useState } from "react";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import AuthService from "../../../services/auth/AuthService";
import ApiError from "../../../services/ApiError";
import { ROUTE_PATHS } from "../../../constants";
import Signup from "./Signup";


const SignupContainer = () => {
  const navigate = useCustomNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

  const signupClickHandler = async (inputData) => {
    setError("");
    setIsLoading(true);

    const { username, email, password } = inputData;

    try {
      const response = await AuthService.signUp(email, username, password);

      setIsLoading(false);

      if (!(response instanceof ApiError)) {
        setIsSignupSuccessful(true);
      } else {
        setError(response?.errorResponse?.message || response.errorMessage);
      }
    } catch (error) {
      setError("An error occurred while signing up.");
      setIsLoading(false);
    }
  };

  const loginClickHandler = () => {
    navigate(ROUTE_PATHS.login, true);
  };

  return (
    <Signup
      loginClickHandler={loginClickHandler}
      signupClickHandler={signupClickHandler}
      isLoading={isLoading}
      apiError={error}
      isSignedUp={isSignupSuccessful}
    />
  );
};

export default SignupContainer;
