// File: Pagination.js
import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ totalItems= 100, itemsPerPage=5, currentPage=1, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const range = 3; // Number of pages to show around the current page
        const isStartEllipsis = currentPage > range + 1;
        const isEndEllipsis = currentPage < totalPages - range;

        // First Page
        pages.push(
            <button
                key={1}
                className={`pagination-button ${
                    currentPage === 1 ? 'active' : ''
                }`}
                onClick={() => handlePageClick(1)}
            >
                1
            </button>
        );

        // Start Ellipsis
        if (isStartEllipsis) {
            pages.push(
                <span key="start-ellipsis" className="pagination-ellipsis">
                    ...
                </span>
            );
        }

        // Middle Pages
        for (
            let i = Math.max(2, currentPage - range);
            i <= Math.min(totalPages - 1, currentPage + range);
            i++
        ) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-button ${
                        currentPage === i ? 'active' : ''
                    }`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }

        // End Ellipsis
        if (isEndEllipsis) {
            pages.push(
                <span key="end-ellipsis" className="pagination-ellipsis">
                    ...
                </span>
            );
        }

        // Last Page
        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    className={`pagination-button ${
                        currentPage === totalPages ? 'active' : ''
                    }`}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {renderPageNumbers()}
            <button
                className="pagination-button"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
