import React, {useEffect, useState} from 'react';
import {PaginationButtons} from "../../components";
import {Link} from "react-router-dom";
import { DateTime } from 'luxon';

import {getUserOrders} from "../../services";

export function OrderHistory() {
    const [headings] = useState(['id', 'date', 'total', 'status', '']);
    const [orders, setOrders ] = useState([]);

    const [pageInfo, setPageInfo] = useState({
        limit: 10,
        skip: 0,
        total: 0
    });

    const mapResponse = (response) => {
        setOrders(response.data);
        setPageInfo({limit: response.limit, skip: response.skip, total: response.total});
    }

    useEffect(() => {
        getUserOrders(pageInfo).then(mapResponse);
    }, [pageInfo.limit, pageInfo.skip]);

    const handlePageChange = (pageNumber = 1) => {
        setPageInfo({...pageInfo, skip: (pageNumber - 1) * pageInfo.limit});
    };

    return (
        <div className="flex flex-col">
            <div className="min-w-0 bg-white p-3 mb-3">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate text-center">Orders</h2>
            </div>
            <div className="mb-4 self-center w-4/5 justify-self-center flex-grow overflow-auto p-4">
                <table className="w-full border border-green-500">
                    <thead>
                    <TableHeaderRow headings={headings}/>
                    </thead>
                    <tbody className="bg-white">
                    <TableDataRow orders={orders}/>
                    </tbody>
                </table>
            </div>
            <div className="mt-auto">
                <PaginationButtons currentPage={Math.floor(pageInfo.skip / pageInfo.limit + 1)} pageCount={Math.ceil(pageInfo.total / pageInfo.limit)} onPageChanged={handlePageChange} />
            </div>
        </div>
    );
}

function TableHeaderRow({headings}) {
    return (
        <tr className="text-md font-semibold tracking-wide text-left text-white bg-green-500 uppercase border-b border-white">
            {headings.map(heading => (
                <th key={heading} className="px-4 py-3">{heading}</th>
            ))}
        </tr>
    );
}

function TableDataRow({orders}) {
    console.log({orders});

    return (
        <>
            {orders.map(item => (
                <tr key={item._id} className="text-gray-700">
                    <td className="px-4 py-3 border border-green-500">
                        {item._id}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {DateTime.fromISO(item.dateCreated).toLocaleString(DateTime.DATETIME_MED)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R{item.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.status}
                    </td>
                    <td className="px-4 py-3 border border-green-500 text-center">
                        <Link to={`/order-details/${item._id}`} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View Details
                        </Link>
                    </td>
                </tr>
            ))}
        </>
    );
}
