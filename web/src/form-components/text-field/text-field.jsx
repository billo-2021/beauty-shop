import React from 'react';
import { Field } from 'formik';
import classNames from 'classnames';

import { FormField } from '../form-field/form-field';

export function TextField({name, label, hide, description, validate, ...rest}) {
    const validateField = hide ? () => { } : validate;
    return (
        <FormField name={name} label={label} hide={hide}>
            <Field
                name={name}
                hasDescription={Boolean(description)}
                validate={validateField}
                component={Input}
                {...rest} />
        </FormField>
    );
}

function Input({field: { name, ...field}, form: { errors, touched}, hasDescription, ...rest}) {
    const showError = errors[name] !== undefined && touched;
    const addBottomMargin = !showError && !hasDescription;
    return (
        <input
            name={name}
            {...field}
            {...rest}
            style={{height: '54px'}}
            className={classNames('block w-full p-1.5 text-base border-b border-green-700 font-normal focus:outline-none leading-normal transition duration-300',
                { 'border-red': showError },
                { 'mb-0': !addBottomMargin }, {'mb-0': addBottomMargin }
                )}
            />
    );
}
