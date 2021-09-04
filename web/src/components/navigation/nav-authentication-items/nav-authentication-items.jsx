import React, {Fragment, useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';

import {Menu, Transition} from "@headlessui/react";
import {UserIcon} from "@heroicons/react/outline";
import {isLoggedIn, getUser} from "../../../services";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function NavAuthenticationItems() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        setUser(getUser());
    }, []);

    return (
        <Menu as="div" className="ml-3 relative">
            <div className="flex">
                <Menu.Button className="bg-white p-1 mr-2 rounded-full text-green-500 shadow hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
                {loggedIn && <p className="text-white">{user?.email}</p>}
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <NavLink exact
                                     to="/profile"
                                     activeClassName="bg-gray-100"
                                     className="block px-4 py-2 text-sm text-gray-700">
                                Your Profile
                            </NavLink>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <NavLink exact
                                     to="/signin"
                                     activeClassName="bg-gray-100"
                                     className="block px-4 py-2 text-sm text-gray-700">
                                Sign in
                            </NavLink>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <NavLink exact
                                to="/signup"
                                activeClassName="bg-gray-100"
                                className="block px-4 py-2 text-sm text-gray-700">
                                Sign up
                            </NavLink>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
