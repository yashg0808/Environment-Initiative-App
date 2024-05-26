import { useEffect, useState } from "react";
import { useAppSelector } from "../store";

const useBreakpointCheck = (breakpoint) => {
  /* Current breakpoint from redux */
  const currentBreakpoint = useAppSelector(
    (state) => state.breakpoint.currentBreakpoint
  );
  const [isCurrentBreakpoint, setIsCurrentBreakpoint] = useState(false);

  useEffect(() => {
    const breakpointWidthInInt = parseInt(breakpoint);
    if (window.innerWidth >= breakpointWidthInInt) {
      setIsCurrentBreakpoint(true);
    } else {
      setIsCurrentBreakpoint(false);
    }
  }, [breakpoint, currentBreakpoint]);

  return isCurrentBreakpoint;
};

export default useBreakpointCheck;
