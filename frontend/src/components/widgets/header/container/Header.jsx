import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { useAppSelector } from "../../../../store";
import useBreakpointCheck from "../../../../hooks/useBreakpointCheck";
import { BREAKPOINTS } from "../../../../constants";
import InfoHeaderContainer from "../../infoheader/InfoHeaderContainer";
// import Hamburger from "../../../basic/Hamburger";
import SearchInput from "../../../basic/SearchInput";
import Hamburger from "../../../basic/Hamburger";
import NavList from "../../../basic/NavList";

const Header = forwardRef(function Header(props, ref) {

  const {logoClickHandler, 
    navItemList, 
    // itemsInCart = 0, 
    // cartClickHandler, 
    searchHandler
    } = props;

  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);
  const isLG = useBreakpointCheck(BREAKPOINTS.lg);

  /* Mobile & Tablet */
  if (!isLG) {
    return (
      <header ref={ref} className="fixed top-0 w-full z-10 bg-white">
        <InfoHeaderContainer />
        <div
          className={`flex items-center justify-between px-2 pb-4 mt-4 border-b-2 border-b-neutral-100`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Hamburger
            headingText={t("companyName")}
            navList={navItemList}
          />
          <SearchInput
            placeholder={t("searchProductsPlaceholder")}
            className="flex-1 mx-8"
            submitHandler={searchHandler}
          />
          {/* <Button onClickHandler={cartClickHandler}> */}
            {/* <CartIcon className="w-8 h-8 text-black" quantity={itemsInCart} /> */}
          {/* </Button> */}
        </div>
      </header>
    );
  }

  /* Desktop */
  return (
    <header ref={ref} className="fixed top-0 w-full z-10 bg-white">
      <InfoHeaderContainer />
      <div
        className={`flex justify-between items-center mt-4 px-10 pb-4 border-b-2 border-b-neutral-100 `}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <button
          className={`font-semibold capitalize text-2xl tracking-wider text-black`} onClick={logoClickHandler}
        >
          {t("Env Initiative App")}
        </button>

        <NavList navList={navItemList} className="w-1/3" />

        <div className={`flex w-2/6`}>
          <SearchInput
            placeholder={t("searchProductsPlaceholder")}
            className={`w-full ${isRTL ? "ml-2" : "mr-2"}`}
            submitHandler={searchHandler}
          />
          {/* <Button onClickHandler={cartClickHandler}> */}
            {/* <CartIcon className="w-8 h-8 text-black" quantity={itemsInCart} /> */}
          {/* </Button> */}
        </div>
      </div>
    </header>
  );
});

export default Header;