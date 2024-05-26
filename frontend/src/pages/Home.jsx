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

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="container mx-auto px-4">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Environmental Initiatives</h2>
          <p className="text-lg text-gray-700">Browse, join, and create initiatives to make a positive impact.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Track Eco-Friendly Actions</h2>
          <p className="text-lg text-gray-700">Log your sustainable actions and see your environmental impact.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Engage with the Community</h2>
          <p className="text-lg text-gray-700">Connect with like-minded individuals, share updates, and support each other.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Challenges and Earn Rewards</h2>
          <p className="text-lg text-gray-700">Take part in challenges, earn badges, and unlock rewards for eco-friendly actions.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Resources and Education</h2>
          <p className="text-lg text-gray-700">Explore articles, videos, and tips to live sustainably and share your knowledge with others.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Discover Environmental Initiatives on the Map</h2>
          <p className="text-lg text-gray-700">Explore initiatives near you and create your own with the map feature.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
