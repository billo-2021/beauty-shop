import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Toast } from '../../components';

import { getProducts, addToCart} from "../../services";
import {ShoppingCartIcon} from "@heroicons/react/outline";
import { PaginationButtons} from "../../components";

export function LandingPage() {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        limit: 6,
        skip: 0,
        total: 0
    });

    const mapResponse = (response) => {
        setProducts(response.data);
        setPageInfo({limit: response.limit, skip: response.skip, total: response.total});
    }

    const handleAddToCart = async (productId) => {
        return addToCart(productId, 1).then(() => {
            Toast('Item added to cart');
        });
    }


    useEffect(() => {
        getProducts(pageInfo).then(mapResponse);
    }, [pageInfo.limit, pageInfo.skip]);

    const handlePageChange = (pageNumber = 1) => {
        setPageInfo({...pageInfo, skip: (pageNumber - 1) * pageInfo.limit});
    };

    return (
        <div className="min-h-90vh flex flex-col">
            <div className="min-w-0 bg-white p-3">
                <h2 className="text-lg font-bold leading-7 text-gray-500 sm:text-3xl sm:truncate text-center">Shop</h2>
            </div>
            <div className="mb-2">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 justify-center justify-items-center max-w-5xl p-5 m-auto">
                    {products.map((product) => (
                        <div key={product._id} className="flex flex-col justify-between max-w-sm rounded overflow-hidden border shadow-sm hover:shadow-xl cursor-pointer">
                            <div className="px-6 py-4">
                                <div className="font-bold text-gray-500 text-xl mb-2">{product.name}</div>
                                <p className="text-gray-700 text-base">
                                    {product.description}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2 flex flex-row justify-between">
                            <span
                                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">R{product.price}</span>
                                <span
                                    className="inline-block bg-gray-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#{product.category}</span>
                            </div>
                            <div className="p-4 flex flex-row justify-between">
                                <Link to={`product-details/${product._id}`} key={product._id} className="mr-2 flex-grow flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(product._id)}
                                    className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <ShoppingCartIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <PaginationButtons currentPage={Math.floor(pageInfo.skip / pageInfo.limit + 1)} pageCount={Math.ceil(pageInfo.total / pageInfo.limit)} onPageChanged={handlePageChange} />
            </div>
        </div>
    );
}
