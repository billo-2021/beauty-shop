import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import {TextField} from "../../form-components";
import {Button, Toast} from "../../components";
import {getCart, checkout} from "../../services";
import { useHistory } from 'react-router-dom';

export function Checkout() {
    const { push } = useHistory();

    const [cart, setCart] = useState({userEmailAddress: '', items: []});
    useEffect(() => {
        getCart().then((cart) => {
            setCart(cart);
        });
    }, []);

    const getCartTotal = () => {
        return cart.items.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity, 0)
    }

    const handleSubmit = values => {
        const {
            firstName,
            lastName,
            street,
            city,
            province,
            postalCode
        } = values;

        return checkout({firstName, lastName, street, city, province, postalCode}).then(() => {
            Toast('Your order has been placed');
            push('/orders');
        });
    };

    return (
        <div className="min-h-90vh flex flex-col">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    street: '',
                    city: '',
                    province: '',
                    postalCode: '',
                    cardNumber: '',
                    cardHolder: '',
                    expirationDate: '',
                    cvc: ''
                }}
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center bg-white py-4 px-4 sm:px-6 lg:px-8 m-auto">
                    <Form className="flex flex-row rounded shadow-md rounded-tr rounded-br space-x-6 border border-green-500">
                        <div className="flex flex-col bg-green-500 p-4">
                            <div>
                                <h2 className="text-lg font-bold leading-normal mt-0 mb-4 text-white text-center">Shipping Details</h2>
                            </div>
                            <div className="flex space-x-3">
                                <TextField name="firstName" label="First Name"/>
                                <TextField name="lastName" label="Last Name"/>
                            </div>
                            <div className="flex space-x-3">
                                <TextField name="street" label="Street"/>
                            </div>
                            <div className="flex space-x-3">
                                <TextField name="city" label="City"/>
                                <TextField name="province" label="Province"/>
                                <TextField name="prostalCode" label="Postal Code"/>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold leading-normal mt-0 mb-4 text-white text-center">Order Summary</h2>
                            </div>
                            <div>
                                <table>
                                    <tr className="text-md font-semibold tracking-wide text-left text-green-500 bg-white uppercase border-b border-green">
                                        <th className="px-4 py-3 text-right">Total:</th>
                                        <th className="px-4 py-3">R {getCartTotal().toFixed(2)}</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col p-4">
                            <div>
                                <h2 className="text-lg font-bold leading-normal mt-0 mb-4 text-green-500 text-center">Payment Information</h2>
                            </div>
                            <div className="flex space-x-3">
                                <TextField name="cardNumber" label="Card Number"/>
                                <TextField name="cardHolder" label="Card Holder"/>
                            </div>
                            <div className="flex space-x-3">
                                <TextField name="expirationDate" type="month" label="Expires"/>
                                <TextField name="cvc" type="number" label="CVC"/>
                            </div>
                            <div className="mt-auto flex flex-col space-y-2 mt-3">
                                <Button text={"Checkout"} />
                                <Button text={"Back to cart"} />
                            </div>
                        </div>
                    </Form>
                    <div className="flex flex-row rounded shadow-md">

                    </div>
                </div>
            </Formik>
        </div>
    );
}
