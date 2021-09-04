import React, { useState } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import {getUser} from "../services";

import {
    LandingPage,
    Products,
    EditProduct,
    OrderHistory,
    Signin,
    Signup,
    Cart,
    Checkout,
    OrderDetails,
    ProductDetails,
    UserProfile
} from "../domain";
import { MasterPage} from "../components";

const navigationItems = [
    {name: 'Shop', route: '/', exact: true, component: LandingPage, showMasterPage: true }
];

export function Routes() {

    return (
        <Switch>
            {navigationItems.map((navigationItem) => {
                if(navigationItem.showMasterPage) {
                    return <Route path={navigationItem.route} key={navigationItem.name}
                                  exact={navigationItem.exact}
                                  render={() =>
                                      <MasterPage navigationItems={navigationItems}>
                                          <navigationItem.component/>
                                      </MasterPage>} />
                }
                return <Route path={navigationItem.route} key={navigationItem.name} exact={navigationItem.exact} component={navigationItem.component} />
            })}
            <Route path="/products" render={() => <MasterPage navigationItems={navigationItems}><Products/></MasterPage>} />}
            <Route path="/orders" render={() => <MasterPage navigationItems={navigationItems}><OrderHistory/></MasterPage>} />}
            <Route path="/product/:productId?" render={() => <MasterPage navigationItems={navigationItems}><EditProduct/></MasterPage>} />
            <Route path="/order-details/:orderId?" render={() => <MasterPage navigationItems={navigationItems}><OrderDetails/></MasterPage>} />
            <Route path="/product-details/:productId?" render={() => <MasterPage navigationItems={navigationItems}><ProductDetails/></MasterPage>} />
            <Route path="/cart" exact render={() => <MasterPage navigationItems={navigationItems}><Cart/></MasterPage>} />
            <Route path="/checkout" exact render={() => <MasterPage navigationItems={navigationItems}><Checkout/></MasterPage>} />
            <Route path="/profile" exact render={() => <MasterPage navigationItems={navigationItems}><UserProfile/></MasterPage>} />
            <AuthenticationRoutes/>
            <Redirect to="/" />
        </Switch>
    );
}

function AuthenticationRoutes() {
    return (
        <>
            <Route path="/signin" exact render={() => <MasterPage navigationItems={navigationItems}><Signin/></MasterPage>} />
            <Route path="/signup" exact render={() => <MasterPage navigationItems={navigationItems}><Signup/></MasterPage>} />
        </>
    );
}

/*function ProductsRoutes() {
    return (
        <>
            <Route path="/" exact component={ProductList} />
            <Route path="/products" component={ProductList} />
            <Redirect to="/" />
        </>
    );
}*/
