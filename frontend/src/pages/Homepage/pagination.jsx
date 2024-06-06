// src/components/Pagination.js

import React from 'react';

const Pagination = ({ page, hasNextPage, hasPrevPage, onPageChange }) => {
  return (
    <div className="pagination">
      <button id="a1"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <span> Page {page}</span>
      <button id="a2"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
