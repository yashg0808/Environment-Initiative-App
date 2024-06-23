import useCustomNavigate from "../../../hooks/useCustomNavigate";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Initiative = ({ initiative }) => {
  const navigate = useCustomNavigate();
  console.log(initiative);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <div className="post max-w-lg w-full max-h-lvh bg-white p-6 rounded-lg shadow-md mb-3 mt-3">
      <div className="post-header flex items-center">
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => {
            navigate(`/initiative/${initiative._id}`);
          }}
        >
          {initiative.title}
        </h1>
        <div className="flex items-center text-gray-600 mt-2">
          <svg
            className="w-3 h-2"
            fill="#000000"
            version="1.1"
            id="Capa_1"
            width="800px"
            height="800px"
            viewBox="0 0 395.71 395.71"
          >
            <g>
              <path
                d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
              c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
              C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
              c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
              />
            </g>
          </svg>
          {initiative.location}
        </div>
      </div>
      <div>
        <p
          className="text-gray-500 text-xs cursor-pointer mb-3"
          onClick={() => {
            navigate(`/u?profile=${initiative.creator.username}`);
          }}
        >
          Created By @{initiative.creator.username} (
          {initiative.creatorName.name})
        </p>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/initiative/${initiative._id}`);
        }}
      >
        <p>{initiative.description}</p>
        <div className="post-content mb-4">
          {initiative.images.length > 0 && (
            <Slider {...settings} className="post-images">
              {initiative.images.map((image) => (
                <div key={image._id}>
                  <img
                    src={image.url}
                    alt="Initiative visual content"
                    className="w-full h-80 rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="post-footer">
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            $ Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initiative;
