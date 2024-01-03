import React from "react";

interface CustomersListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalRows: number;
}

const CustomersListPagination: React.FC<CustomersListPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalRows,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((page) => (
      <li
        key={page}
        className={`page-item ${currentPage === page ? "active" : ""}`}
      >
        <a
          className="page-link"
          onClick={() => onPageChange(page)}
          style={{ cursor: "pointer" }}
        >
          {page}
        </a>
      </li>
    ));
  };

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalRows);

  // Check if there are no rows to display
  const noRowsToDisplay = totalRows === 0 || endRange === 0;

  return (
    <div className="row mt-5">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
        {/* You can add some content here if needed */}
      </div>
      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <div id="kt_table_users_paginate">
          <ul className="pagination">
            {/* Render "First" button if currentPage is greater than 1 */}
            {currentPage > 1 && (
              <a
                className="page-link fw-bold me-5"
                onClick={() => onPageChange(1)}
                style={{ cursor: "pointer" }}
              >
                First
              </a>
            )}
            {/* Render page numbers */}
            {renderPageNumbers()}
            {/* Render "Last" button if currentPage is less than totalPages */}
            {currentPage < totalPages && (
              <a
                className="page-link fw-bold me-5"
                onClick={() => onPageChange(totalPages)}
                style={{ cursor: "pointer" }}
              >
                Last
              </a>
            )}
          </ul>
        </div>
      </div>
      {/* Show the range information only if there are rows to display */}
      {!noRowsToDisplay && (
        <div className="col-md-12 text-center mt-3 text-gray-800">
          Showing {startRange} - {endRange} out of {totalRows} Customers
        </div>
      )}
    </div>
  );
};

export { CustomersListPagination };
