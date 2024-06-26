import React, { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalBooks: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalBooks, setPage }) => {
  const totalPages = Math.ceil(totalBooks / 5);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  }, [currentPage, setPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setPage]);

  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
