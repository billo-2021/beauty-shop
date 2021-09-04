import React, {useEffect, useState} from 'react';
import {getProducts, removeProduct} from "../../services";
import {PaginationButtons, Toast } from "../../components";
import { Link } from 'react-router-dom';

export function Products() {
    const [headings] = useState(['name', 'brand', 'category', 'price', 'quantity', 'description', '']);
    const [products, setProducts] = useState([]);
    const [productsChanged, setProductsChanged] = useState(false);

    const [pageInfo, setPageInfo] = useState({
        limit: 10,
        skip: 0,
        total: 0
    });

    const mapResponse = (response) => {
        setProducts(response.data);
        setPageInfo({limit: response.limit, skip: response.skip, total: response.total});
    }


    useEffect(() => {
        getProducts(pageInfo).then(mapResponse);
    }, [pageInfo.limit, pageInfo.skip, productsChanged]);

    const handlePageChange = (pageNumber = 1) => {
        setPageInfo({...pageInfo, skip: (pageNumber - 1) * pageInfo.limit});
    };
    const handleDeleteProduct = (id) => {
        removeProduct(id).then(() => {
            Toast('Product deleted');
            setProductsChanged(!productsChanged);
        });
    }

    return (
        <div className="flex flex-col">
            <div className="min-w-0 bg-white p-3">
                <h2 className="text-lg font-bold leading-7 text-gray-500 sm:text-3xl sm:truncate text-center">Products Management</h2>
            </div>
            <div className="mb-4 self-center w-4/5 justify-self-center flex-grow overflow-auto p-4">
                <table className="w-full border border-green-500">
                    <thead>
                    <TableHeaderRow headings={headings}/>
                    </thead>
                    <tbody className="bg-white">
                    <TableDataRow products={products} deleteProductHandler={handleDeleteProduct}/>
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

function TableDataRow({products, deleteProductHandler}) {
    return (
        <>
            {products.map(item => (
                <tr key={item._id} className="text-gray-700">
                    <td className="px-4 py-3 border border-green-500">
                        {item.name}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.brand}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.category}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R {(item.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.quantity}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        {item.description}
                    </td>
                    <td className="px-4 py-3 border border-green-500 text-center">
                        <Link to={`/product/${item._id}`} className="mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Edit
                        </Link>
                        <button onClick={() => deleteProductHandler(item._id)} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
