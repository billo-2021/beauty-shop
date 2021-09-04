import React from 'react';
import classNames from 'classnames';

export function PaginationButtons({pageCount, currentPage, onPageChanged}) {
    const getPageNumbers = () => {
        if(pageCount < 4) {
            return [...Array(pageCount + 1).keys()].slice(1);
        }
        else if(currentPage <= 5) {
            return [1, 2, 3, 4, 5];
        }
        else if(currentPage >= pageCount - 3) {
            return [...Array(6).keys()].reverse().map(v => pageCount - v);
        }
        else {
            return [currentPage - 1, currentPage, currentPage + 1];
        }
    }

    return (
        <div className="flex items-center justify-center space-x-4">
            <button onClick={() => onPageChanged(currentPage - 1) } disabled={currentPage === 1} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Previous</button>
            { currentPage > 3 && pageCount > 5 &&
            <button onClick={() => onPageChanged(1) } className="w-10 h-10 bg-green-500 p-1 mr-2 rounded-full text-white shadow hover:text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">1</button>
            }
            {
                getPageNumbers().map(num =>
                    <button key={num} onClick={() => onPageChanged(num) } className={classNames('w-10 h-10 bg-green-500 p-1 mr-2 rounded-full text-white shadow hover:text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        ,{'bg-green-700': num === currentPage})}>
                        {num}
                    </button>
                )
            }
            {pageCount > 5 && currentPage < (pageCount - 4) &&
            <button onClick={() => onPageChanged(pageCount) } className="w-10 h-10 bg-green-500 p-1 mr-2 rounded-full text-white shadow hover:text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">{pageCount}</button>
            }
            <button onClick={() => onPageChanged(currentPage + 1) } disabled={currentPage === pageCount} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next</button>
        </div>
    );
}
