import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import ApiError from "../../services/ApiError";
import InitiativeService from "../../services/initiative/InitiativeService";
import { ROUTE_PATHS } from "../../constants";
import Skeleton from "../../components/basic/Skeleton";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import Web3 from "web3";
import { abi, providerUrl, contractAddress } from "../../constants";

function InitiativePage() {
  const { initiativeId } = useParams();
  const navigate = useCustomNavigate();
  const [initiative, setInitiative] = useState(null); // Initialize as null
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitiative = async () => {
      setLoading(true);
      const response = await InitiativeService.getInitiativeById(initiativeId);
      if (response instanceof ApiError) {
        navigate(ROUTE_PATHS.login);
        console.log(response.errorMessage);
      } else {
        setInitiative(response);
      }
      setLoading(false);
    };

    const fetchSupporters = async () => {
      const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
      const contract = new web3.eth.Contract(abi, contractAddress);
      const newSupporters = [];

      contract.events
        .FundsReceived({
          fromBlock: 0,
        })
        .on("data", function (event) {
          if (event.returnValues.initiativeId === initiativeId) {
            const amountInEth = web3.utils.fromWei(event.returnValues.amount, "ether");
            newSupporters.push({
              supporter: event.returnValues.userId,
              amount: amountInEth,
            });
            setSupporters([...newSupporters]);
          }
        })
    };

    fetchInitiative();
    fetchSupporters();
  }, [initiativeId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (!initiative) {
    return null;
  }

  if (loading) {
    return (
      <div className="App w-full mx-auto">
        <div className="flex flex-col items-center">
          <div className="animate-pulse bg-gray-300 w-full max-w-lg p-4  shadow-lg rounded-lg cursor-pointer m-6" />
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} type="post" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-centre ml-4">
      <div className="post max-w-lg w-full max-h-lvh bg-white p-6 rounded-lg shadow-md mb-3 mt-3">
        <div className="post-header flex items-center">
          <h1 className="text-lg font-semibold cursor-pointer">
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
          <p>Amount Received: {initiative.amountReceived}</p>
          <p>Supporters: {initiative.supporterCount}</p>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              navigate(`/support/${initiative._id}`);
            }}
          >
            $ Support
          </button>
        </div>
      </div>
      <div className="ml-4 mt-3">
        <h1 className="text-lg font-semibold">Supporters</h1>
        {supporters.map((supporter, index) => (
          <div
            key={index}
            className="flex items-center mt-3 mb-3 cursor-pointer"
            onClick={() => {
              navigate(`/u?profile=${supporter.supporter}`);
            }}
          >
            @{supporter.supporter}: {supporter.amount} eth
          </div>
        ))}
      </div>
    </div>
  );
}

export default InitiativePage;
