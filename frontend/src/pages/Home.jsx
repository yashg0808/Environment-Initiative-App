import Link from "../components/basic/Link";
import { LinkTypes, ROUTE_PATHS } from "../constants";
import useCustomNavigate from "../hooks/useCustomNavigate";

const Home = () => {
  const navigate = useCustomNavigate();

  return (
    <div>
      <div className="h-20"></div>
      This is Home Page <br></br>
      <Link
        text={"Signup"}
        linkType={LinkTypes.red}
        onClick={() => {
          navigate(ROUTE_PATHS.signup);
        }}
        className="capitalize mt-4"
      /><br/>
      <Link
        text={"Login"}
        linkType={LinkTypes.red}
        onClick={() => {
          navigate(ROUTE_PATHS.login);
        }}
        className="capitalize mt-4"
      /><br></br>
      <Link
        text={"protected"}
        linkType={LinkTypes.red}
        onClick={() => {
          navigate(ROUTE_PATHS.protected);
        }}
        className="capitalize mt-4"
      />
    </div>
  );
};

export default Home;
