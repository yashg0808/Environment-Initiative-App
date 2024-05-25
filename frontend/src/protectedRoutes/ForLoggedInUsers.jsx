import { useEffect } from "react";
import { useAppSelector } from "../store";
import { ROUTE_PATHS } from "../constants";
import { Outlet } from "react-router-dom";
import useCustomNavigate from "../hooks/useCustomNavigate";


const ForLoggedInUsers = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useAppSelector(
    (state) => state.auth.isLogInCheckDone
  );

  const navigate = useCustomNavigate();


  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(ROUTE_PATHS.login);
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