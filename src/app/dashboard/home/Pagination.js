// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];

        // Always show first and last page
        // And show pages around current page

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
            ) {
                pages.push(i);
            }
        }

        // Add ellipsis where needed
        const result = [];
        let prevPage = null;

        for (const page of pages) {
            if (prevPage && page - prevPage > 1) {
                result.push('ellipsis-' + page);
            }
            result.push(page);
            prevPage = page;
        }

        return result;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center items-center space-x-2 mt-10">
            {/* Previous page button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-uno text-texto hover:bg-dos hover:text-white'
                    } transition-colors duration-300`}
                aria-label="Página anterior"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => {
                if (typeof page === 'string' && page.startsWith('ellipsis')) {
                    // Render ellipsis
                    return <span key={page} className="px-3 py-2 text-gray-500">...</span>;
                }

                // Render page number
                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === page
                                ? 'bg-dos text-white'
                                : 'bg-uno text-texto hover:bg-dos hover:text-white'
                            } transition-colors duration-300`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next page button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-uno text-texto hover:bg-dos hover:text-white'
                    } transition-colors duration-300`}
                aria-label="Página siguiente"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Pagination;