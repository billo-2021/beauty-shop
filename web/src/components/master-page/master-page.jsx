import React from 'react';

import { NavBar, NavAuthenticationItems } from "../navigation";

export function MasterPage({children, navigationItems}) {
    return (
        <>
            <NavBar navigationItems={navigationItems}>{NavAuthenticationItems()}</NavBar>
            {children}
        </>
    );
}
