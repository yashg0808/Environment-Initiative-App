import { BREAKPOINTS } from "../constants";

export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  const breakpoints = Object.entries(BREAKPOINTS);
  for (let counter = breakpoints.length - 1; counter >= 0; --counter) {
    const [breakpointName, breakpointWidth] = breakpoints[counter];
    const breakpointWidthInInt = parseInt(breakpointWidth);
    if (width >= breakpointWidthInInt) {
      return breakpointName;
    }
  }
  return "";
};


