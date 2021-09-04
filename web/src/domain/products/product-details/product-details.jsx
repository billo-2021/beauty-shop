import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from "react-router-dom";

import {addToCart, findProduct} from '../../../services';
import {ShoppingCartIcon} from "@heroicons/react/outline";

export function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const handleAddToCart = async (productId) => {
        return addToCart(productId, 1);
    }

    useEffect(() => {
        findProduct(productId).then(setProduct);
    }, [productId]);

    if(!productId) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full max-w-sm rounded shadow-md">
                <div className="p-3 bg-green-500 rounded-t">
                    <h2 className="text-lg font-bold leading-normal mt-0 text-white text-center">{product.name}</h2>
                </div>
                <div className="flex flex-col rounded-b p-10 space-y-5">
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Brand:</p>
                        <p>{product?.brand}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Category:</p>
                        <p>{product?.category}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-md font-semibold">Price:</p>
                        <p>R{product?.price?.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-md font-semibold text-center">Description:</p>
                        <p>{product?.description}</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => handleAddToCart(product._id)}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <ShoppingCartIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
