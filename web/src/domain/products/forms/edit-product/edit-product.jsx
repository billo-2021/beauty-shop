import React, {useEffect, useState } from 'react';
import {Button, Toast} from "../../../../components";
import {Form, Formik} from "formik";
import {TextField} from "../../../../form-components";
import { useParams } from 'react-router-dom';
import { addProduct, findProduct, updateProduct } from "../../../../services";
import {required} from "../../../../services/form-validation/form-validation";

export function EditProduct() {
    const { productId } = useParams();
    const [loading, setLoading ] = useState(false);
    const [ product, setProduct ] = useState({
        name: '',
        brand: '',
        price: '',
        quantity: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        if(productId) {
            findProduct(productId).then(setProduct);
        }
    }, [])

    const handleSubmit = values => {
        setLoading(true);

        const {
            _id,
            name,
            brand,
            category,
            price,
            quantity,
            description
        } = values;

        if(!productId) {
            return addProduct({name, brand, category, price: parseFloat(price), quantity: parseInt(quantity), description}).then(() => Toast('Product added')).finally(() => setLoading(false));
        }
        else {
            return updateProduct({_id, name, brand, category, price: parseFloat(price), quantity: parseInt(quantity), description}).then(() => Toast('Product updated')).finally(() => setLoading(false));
        }
    };

    return (
        <div className="min-h-90vh flex flex-col">
            <div className="min-w-0 bg-white p-4">
                { productId ?
                    <h2 className="text-lg font-bold leading-7 text-gray-500 sm:text-3xl sm:truncate text-center">Edit Product</h2>
                    :
                    <h2 className="text-lg font-bold leading-7 text-gray-500 sm:text-3xl sm:truncate text-center">Create Product</h2>
                }

            </div>
            <Formik
                enableReinitialize={true}
                initialValues={product}
                onSubmit={handleSubmit}
                validateOnMount
            >
                {({ isValid }) => {
                    return (
                        <div className="flex justify-center bg-white py-4 px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-row rounded shadow-md">
                                <div className="h-full w-1/4 bg-green-500"></div>
                                <Form className="w-full rounded-tr rounded-br p-10 space-y-6 border border-green-500">
                                    <div className="flex space-x-3">
                                        <TextField name="name" label="Product Name" validate={required('First name is required')}/>
                                        <TextField name="brand" label="Brand" validate={required('First name is required')}/>
                                    </div>
                                    <div className="flex space-x-3">
                                        <TextField name="price" label="Price" validate={required('First name is required')}/>
                                        <TextField name="quantity" label="Quantity" validate={required('First name is required')}/>
                                    </div>
                                    <div className="flex space-x-3">
                                        <TextField name="category" label="Category" validate={required('First name is required')}/>
                                        <TextField name="description" type="text-area" label="Description" validate={required('First name is required')}/>
                                    </div>
                                    <div>
                                        <Button disabled={!isValid} loading={loading} text={productId ? "Update" : "Create"} />
                                    </div>
                                </Form>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}
