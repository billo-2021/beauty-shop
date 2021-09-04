import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {registerUser} from "../../../services";
import {Form, Formik} from "formik";
import {TextField} from "../../../form-components";
import {Button} from "../../../components";
import {required} from "../../../services/form-validation/form-validation";

export function Signup() {
    const { push } = useHistory();
    const [loading, setLoading ] = useState(false);

    const handleSubmit = values => {
        setLoading(true);

        const {
            firstName,
            lastName,
            cellphoneNumber,
            emailAddress,
            password
        } = values;

        return registerUser({firstName, lastName, cellphoneNumber, emailAddress, password})
            .then(() => {
                push('/');
            }).finally(() => setLoading(false));
    }
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                emailAddress: '',
                cellphoneNumber: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={handleSubmit}
            validateOnMount
        >
            {({ isValid }) => {
                return (
                    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-lg w-full max-w-md rounded shadow-md">
                            <div className="p-3 bg-green-500 rounded-t">
                                <h2 className="text-lg font-bold leading-normal mt-0 text-white text-center">Sign up</h2>
                            </div>
                            <Form className="rounded-b p-10 space-y-6">
                                <div className="flex space-x-3">
                                    <TextField name="firstName" label="First Name" validate={required('First name is required')}/>
                                    <TextField name="lastName" label="Last Name"/>
                                </div>
                                <div className="flex space-x-3">
                                    <TextField name="emailAddress" label="Email Address" validate={required('First name is required')}/>
                                    <TextField name="cellphoneNumber" label="Cellphone Number" validate={required('First name is required')}/>
                                </div>
                                <div className="flex space-x-3">
                                    <TextField name="password" type="password" label="Password" validate={required('First name is required')}/>
                                    <TextField name="confirmPassword" type="password" label="Confirm Password" validate={required('First name is required')}/>
                                </div>
                                <div className="flex justify-end">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-green-700 hover:text-indigo-500">
                                            Already have an account?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <Button disabled={!isValid} loading={loading} text={"Sign up"} />
                                </div>
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}
