import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {useHistory } from 'react-router-dom';

import { login } from '../../../services';
import {TextField } from '../../../form-components';
import { Button } from '../../../components';
import {required} from "../../../services/form-validation/form-validation";

export function Signin() {
    const { push } = useHistory();
    const [loading, setLoading ] = useState(false);

    const handleSubmit = values => {
        setLoading(true);

        return login(values.emailAddress, values.password)
            .then(() => push('/'))
            .finally(() => setLoading(false));
    }
    return (
        <Formik
            initialValues={{
                emailAddress: '',
                password: ''
            }}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => {
                return (
                    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full max-w-sm rounded shadow-md">
                            <div className="p-3 bg-green-500 rounded-t">
                                <h2 className="text-lg font-bold leading-normal mt-0 text-white text-center">Sign in</h2>
                            </div>
                            <Form className="rounded-b p-10 space-y-6">
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <TextField name="emailAddress" label="Email Address" validate={required('First name is required')}/>
                                    <TextField name="password" type="password" label="Password" validate={required('First name is required')}/>
                                    {/*<div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>*/}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-green-700 hover:text-indigo-500">
                                            Don't have an account?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <Button disabled={!isValid} laoding={loading} text={"Sign in"} />
                                </div>
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}
