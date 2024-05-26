// import { NavigationOption } from "../../constants";
// import { useAppSelector } from "../../store";
// import NavItem from "./NavItem";

import { useAppSelector } from "../../store";
import NavItem from "./NavItem";

const NavList = ({ navList, className = "" }) => {

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <div
      className={`flex flex-col lg:flex-row lg:justify-between lg:items-center 
        ${className} `}
        dir={isRTL ? 'rtl': 'ltr'}
    >
      {navList.map((navItem) =>
        navItem?.customComponent ? (
          <div key={navItem.id}>{navItem.customComponent}</div>
        ) : (
          <NavItem navItem={navItem} key={navItem.id} />
        )
      )}
    </div>
  );
};

export default NavList;
