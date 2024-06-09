import React, { useCallback, useEffect, useState } from "react";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { useAppDispatch, useAppSelector } from "../../../../store";
import AuthService from "../../../../services/auth/AuthService";
import ApiError from "../../../../services/ApiError";
import { logIn, logOut, updateLoginCheckDone } from "../../../../store/AuthSlice";
import Header from "./Header";
import { QUERY_PARAMS, ROUTE_PATHS } from "../../../../constants";
import { createSearchParams } from "react-router-dom";
import { getNavigationItemList } from "../../../../data/applicationData";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref
) {
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const username = useAppSelector((state) => state.auth.userDetails?.username);

  const [navigationList, setNavigationList] = useState([]);

  /* Navigate to /, on click of logo*/
  const logoClickHandler = () => {
    navigate("/");
  };
  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser();
    if (!(response instanceof ApiError)) {
      dispatch(logIn(response));
    } else {
      dispatch(logOut());
    }
    dispatch(updateLoginCheckDone(true));
  }, [dispatch]);

  /* Navigate to /u?profile=<inputText> */
  const searchHandler = async (inputText) => {
    if (inputText) {
      navigate({
        pathname: ROUTE_PATHS.profile,
        search: createSearchParams({
          [QUERY_PARAMS.ProfileSearch]: inputText,
        }).toString(),
      });
    }
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setNavigationList(getNavigationItemList(isLoggedIn,username));
  }, [isLoggedIn]);

  return (
    <Header
      ref={ref}
      logoClickHandler={logoClickHandler}
      navItemList={navigationList}
      searchHandler={searchHandler}
    />
  );
});
export default HeaderContainer;