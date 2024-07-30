import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <nav className="w-full sm:w-auto sm:mr-auto">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => onPageChange(1)} href="#">
              <i className="w-4 h-4" data-lucide="chevrons-left" />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => onPageChange(currentPage - 1)} href="#">
              <i className="w-4 h-4" data-lucide="chevron-left" />
            </a>
          </li>
          {pageNumbers.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <a className="page-link" onClick={() => onPageChange(page)} href="#">
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" onClick={() => onPageChange(currentPage + 1)} href="#">
              <i className="w-4 h-4" data-lucide="chevron-right" />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => onPageChange(totalPages)} href="#">
              <i className="w-4 h-4" data-lucide="chevrons-right" />
            </a>
          </li>
        </ul>
      </nav>
      <select className="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
  );
};

export default Pagination;
