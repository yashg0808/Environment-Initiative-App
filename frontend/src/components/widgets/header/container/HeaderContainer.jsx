import React, { useCallback, useEffect } from "react";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { useAppDispatch, useAppSelector } from "../../../../store";
import AuthService from "../../../../services/auth/AuthService";
import ApiError from "../../../../services/ApiError";
import { logIn, logOut, updateLoginCheckDone } from "../../../../store/AuthSlice";
import Header from "./Header";
import { QUERY_PARAMS, ROUTE_PATHS } from "../../../../constants";
import { createSearchParams } from "react-router-dom";

const HeaderContainer = React.forwardRef(function HeaderContainer(
  _,
  ref
) {
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // const userCart = useAppSelector((state) => state.cart.userCart);

  // const [navigationList, setNavigationList] = useState([]);

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

  /* Navigate to /product-search?productNameSearch=<inputText> */
  const searchHandler = (inputText) => {
    if (inputText) {
      navigate({
        pathname: ROUTE_PATHS.productSearch,
        search: createSearchParams({
          [QUERY_PARAMS.productNameSearch]: inputText,
        }).toString(),
      });
    }
  };

  /* Fetch Current User: To determine login status */
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /* Fetch Users' Cart, when isLoggedIn flag changes in redux */
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getUserCartThunk());
  //   } else {
  //     /* Reset Cart Slice as user is logged out */
  //     dispatch(resetCartSlice());
  //   }
  // }, [dispatch, isLoggedIn]);

  /* Get Navigation Item List based on isLoggedIn flag */
  // useEffect(() => {
  //   setNavigationList(getNavigationItemList(isLoggedIn));
  // }, [isLoggedIn]);

  return (
    <Header
      ref={ref}
      logoClickHandler={logoClickHandler}
      // navItemList={navigationList}
      // itemsInCart={userCart ? userCart.items.length : 0}
      // cartClickHandler={cartClickHandler}
      searchHandler={searchHandler}
    />
  );
});
export default HeaderContainer;