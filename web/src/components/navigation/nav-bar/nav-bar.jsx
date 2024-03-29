import React from 'react';
import { NavLink } from "react-router-dom";
import {Disclosure} from "@headlessui/react";
import {MenuIcon, SearchIcon, ShoppingCartIcon, XIcon} from "@heroicons/react/outline";

import logo from '../../../assets/images/logo.png';
import logoWithText from '../../../assets/images/logo-with-text.png';
import {getUser, isLoggedIn} from "../../../services";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function NavBar({navigationItems, children}) {
    const loggedIn = isLoggedIn();
    const user = getUser();

    return (
        <Disclosure as="nav" className="bg-green-700">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="hidden lg:block h-5 w-auto"
                                        src={logoWithText}
                                        alt="logo with text"
                                    />
                                    <img
                                        className="block lg:hidden h-5 w-auto"
                                        src={logo}
                                        alt="logo"
                                    />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigationItems.map((item) => (
                                            <NavLink
                                                exact={item.exact}
                                                key={item.name}
                                                     to={item.route}
                                                     activeClassName="bg-white text-green-700"
                                                     className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-green-700">
                                                {item.name}
                                            </NavLink>
                                        ))}
                                        <NavLink
                                            exact
                                            to="/product"
                                            activeClassName="bg-white text-green-700"
                                            className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-green-700">
                                            Add Product
                                        </NavLink>

                                        <NavLink
                                            exact
                                            to="/products"
                                            activeClassName="bg-white text-green-700"
                                            className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-green-700">
                                            Products
                                            </NavLink>
                                        <NavLink
                                            exact
                                            to="/orders"
                                            activeClassName="bg-white text-green-700"
                                            className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-green-700">
                                            Orders
                                            </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="bg-white p-1 mr-2 rounded-full text-green-500 shadow hover:text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <SearchIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <NavLink
                                    exact
                                    to="/cart"
                                    activeClassName="bg-white text-green-700"
                                    className="bg-white p-1 mr-2 rounded-full text-green-500 shadow hover:text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                </NavLink>
                                {children}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item) => (
                                <NavLink
                                    exact={item.exact}
                                    key={item.name}
                                    to={item.route}
                                    activeClassName="bg-white text-green-700"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-green-700">
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
