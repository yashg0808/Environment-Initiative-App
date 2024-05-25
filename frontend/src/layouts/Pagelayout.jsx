import { useRef } from "react";
import ToastMessage from "../components/basic/ToastMessage";
import HeaderContainer from "../components/widgets/header/container/HeaderContainer";
import { Outlet } from "react-router-dom";
import FooterContainer from "../components/widgets/footer/container/FooterContainer";

function Pagelayout() {
  const headerContainerRef = useRef(null);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <ToastMessage />
      <div>
        <HeaderContainer ref={headerContainerRef} />
        {/* <main style={{ marginTop: headerHeight }}> */}
          <Outlet />
        {/* </main> */}
      </div>
      <div className="flex flex-col">
        {/* <ArrowButton
          type={ARROW_BUTTONS.UP}
          onClickHandler={scrollToTop}
          isDisabled={false}
          className={`mb-4 ${isRTL ? "mr-auto ml-4" : "ml-auto mr-4"}`}
        /> */}
        <FooterContainer />
      </div>
    </div>
  );
}

export default Pagelayout;
