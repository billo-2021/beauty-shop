import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {DateTime} from "luxon";

import { getOrder} from "../../services";

export function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState({ items: []});
    const [headings] = useState(['name', 'quantity', 'price', 'subtotal']);

    useEffect(() => {
        getOrder(orderId).then(setOrder);
    }, []);

    if(!orderId) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full max-w-sm rounded shadow-md">
                <div className="p-3 bg-green-500 rounded-t">
                    <h2 className="text-lg font-bold leading-normal mt-0 text-white text-center">Order Deatails</h2>
                </div>
                <div className="flex flex-col rounded-b p-10 space-y-5">
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Id:</p>
                        <p>{order._id}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Date Created:</p>
                        <p>{DateTime.fromISO(order.dateCreated).toLocaleString(DateTime.DATETIME_MED)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Status:</p>
                        <p>{order.status}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Total Price:</p>
                        <p>R{order.total?.toFixed(2)}</p>
                    </div>
                </div>
                <div className="p-3 bg-green-500 rounded-t">
                    <h2 className="text-lg font-bold leading-normal mt-0 text-white text-center">Summary</h2>
                </div>
                <div className="w-full flex-grow overflow-auto m-auto">
                    <table className="w-full border border-green-500">
                        <thead>
                        <TableHeaderRow headings={headings}/>
                        </thead>
                        <tbody className="bg-white">
                        <TableDataRow orderItems={order.items}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TableHeaderRow({headings}) {
    return (
        <tr className="text-md font-semibold tracking-wide text-left text-green-500 uppercase border-b border-white">
            {headings.map(heading => (
                <th key={heading} className="px-4 py-3">{heading}</th>
            ))}
        </tr>
    );
}

function TableDataRow({orderItems}) {
    return (
        <>
            {orderItems.map(item => (
                <tr key={item.name} className="text-gray-700">
                    <td className="px-4 py-3 border border-green-500">
                        {item.name}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.quantity}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R {item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R {(item.price * item.quantity).toFixed(2)}
                    </td>
                </tr>
            ))}
        </>
    );
}
