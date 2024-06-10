import { useEffect } from "react";
import { useAppSelector } from "../store";
import { ROUTE_PATHS } from "../constants";
import { Outlet } from "react-router-dom";
import useCustomNavigate from "../hooks/useCustomNavigate";


const ForLoggedInUsers = () => {
  const isLoggedIn = useAppSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const isLoginCheckDone = useAppSelector(
    (state) => {
      return state.auth.isLogInCheckDone
    }
  );

  const isEmailVerified = useAppSelector(
    (state) => {
      return state.auth.userDetails?.isEmailVerified;
    }
  );
  const navigate = useCustomNavigate();


  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(ROUTE_PATHS.login);
    } else if (isLoginCheckDone && isEmailVerified === false) {
      navigate(ROUTE_PATHS.notemailverified);
    }
  }, [isLoginCheckDone, isLoggedIn, navigate]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }
  return <>
  You are not logged in
  </>;
};

export default ForLoggedInUsers;