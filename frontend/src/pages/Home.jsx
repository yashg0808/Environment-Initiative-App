// import Link from "../components/basic/Link";
// import { LinkTypes, ROUTE_PATHS } from "../constants";
// import useCustomNavigate from "../hooks/useCustomNavigate";

// const Home = () => {
//   const navigate = useCustomNavigate();

//   return (
//     <div>
//       This is Home Page <br></br>
//       <Link
//         text={"Signup"}
//         linkType={LinkTypes.red}
//         onClick={() => {
//           navigate(ROUTE_PATHS.signup);
//         }}
//         className="capitalize mt-4"
//       /><br/>
//       <Link
//         text={"Login"}
//         linkType={LinkTypes.red}
//         onClick={() => {
//           navigate(ROUTE_PATHS.login);
//         }}
//         className="capitalize mt-4"
//       /><br></br>
//       <Link
//         text={"protected"}
//         linkType={LinkTypes.red}
//         onClick={() => {
//           navigate(ROUTE_PATHS.protected);
//         }}
//         className="capitalize mt-4"
//       />
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import Homepage from './Homepage/Homepage';
const Home = () => {
  return (
    <Homepage />
  );
};

export default Home;
