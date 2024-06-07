import React from 'react';

const Pagination = ({ page, hasNextPage, hasPrevPage, onPageChange }) => {
  const handlePrevPage = () => {
    if (hasPrevPage) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
        className={`mr-2 px-4 py-2 rounded ${!hasPrevPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        Previous
      </button>
      <span className="px-4 py-2">{page}</span>
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`ml-2 px-4 py-2 rounded ${!hasNextPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
