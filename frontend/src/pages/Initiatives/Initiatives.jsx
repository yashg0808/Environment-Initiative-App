import React, { useState, useEffect } from "react";
import Skeleton from "../../components/basic/Skeleton";
import Pagination from "../Homepage/pagination";
import InitiativeService from "../../services/initiative/InitiativeService";
import Initiative from "../../components/widgets/initiatives/Initiative";
import "./App.css";

const Initiatives = () => {
  const [loading, setLoading] = useState(true);
  const [initiatives, setInitiatives] = useState([]);
  const [totalInitiatives, setTotalInitiatives] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    fetchInitiatives(page);
  }, [page]);

  const fetchInitiatives = async (page) => {
    setLoading(true);
    const data = await InitiativeService.getInitiatives(page, 10);
    setInitiatives(data.initiatives);
    setTotalInitiatives(data.totalInitiatives);
    setHasNextPage(data.hasNextPage);
    setHasPrevPage(data.hasPrevPage);
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
    <div className="App w-full mx-auto">
      <div className="flex flex-col items-center">
        {initiatives.map((initiative) => (
          <Initiative key={initiative._id} initiative={initiative} />
        ))}
      </div>
      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Initiatives;
