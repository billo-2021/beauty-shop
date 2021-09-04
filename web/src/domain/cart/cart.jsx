import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {isLoggedIn, getCart, addToCart} from "../../services";
import {PlusSmIcon, MinusSmIcon} from "@heroicons/react/outline";
import { setStorageRedirectUrl} from "../../services";
import { Toast } from "../../components";

export function Cart() {
    const [cart, setCart] = useState({userEmailAddress: '', items: []});
    const [headings] = useState(['name', 'quantity', 'price', 'subtotal', '']);
    const [cartChanged, setCartChanged] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { push } = useHistory();

    const handleRemoveFromCart = async (productId) => {
        Toast('Product removed from cart');
        addToCart(productId, -1).then(() => setCartChanged(!cartChanged));
    }

    const updateCartHandler = async (productId, quantity) => {
        addToCart(productId, quantity).then(() => {
            setCartChanged(!cartChanged);
            Toast('Cart updated');
        });
    }

    const handleCheckoutRedirect = () => {
        if(loggedIn) {
            push('/checkout');
        }
        else {
            setStorageRedirectUrl('/checkout');
            push('/signin');
        }
    }

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        getCart().then((cart) => {
            setCart(cart);
        });
    }, [cartChanged]);

    return (
        <div className="flex flex-col">
            <div className="min-w-0 bg-white p-3 mb-3">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate text-center">Your Shopping Cart</h2>
            </div>
            <div className="mb-4 self-center w-1/2 justify-self-center flex-grow overflow-auto">
                <table className="w-full border border-green-500">
                    <thead>
                        <TableHeaderRow headings={headings}/>
                    </thead>
                    <tbody className="bg-white">
                        <TableDataRow cart={cart} removeFromCartHandler={handleRemoveFromCart} updateCartHandler={updateCartHandler}/>
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <Link className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" to="/">
                    Continue Shopping
                </Link>
                <button type="button"
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCheckoutRedirect}
                >
                    Checkout
                </button>
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

function TableDataRow({cart, updateCartHandler}) {
    const getCartTotal = () => {
        return cart.items.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity, 0)
    }
    return (
        <>
            {cart?.items?.map(item => (
                <tr key={item.productId} className="text-gray-700">
                    <td className="px-4 py-3 border border-green-500">
                        {item.name}
                    </td>
                    <td className="px-4 py-3 border border-green-500 text-center">
                        <div className="flex">
                            <button type="button" onClick={() => updateCartHandler(item.productId, -1)}>
                                <MinusSmIcon className="h-6 w-6 mr-2 text-red-500 hover:text-red-700"/>
                            </button>
                            <p className="border border-green-500 px-2">{item.quantity}</p>
                            <button type="button" onClick={() => updateCartHandler(item.productId, +1)}>
                                <PlusSmIcon className="h-6 w-6 ml-2 text-green-500 hover:text-green-700" />
                            </button>
                        </div>
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R {item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        R {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-green-500">
                        <button type="button" onClick={() => updateCartHandler(item.productId, item.quantity * -1)} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Remove</button>
                    </td>
                </tr>
            ))}
            <tr className="text-md font-semibold tracking-wide text-left text-white bg-green-500 uppercase border-b border-white">
                <th colSpan="3" className="px-4 py-3 text-right">Total:</th>
                <th colSpan="2" className="px-4 py-3">R {getCartTotal().toFixed(2)}</th>
            </tr>
        </>
    );
}
