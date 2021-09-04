import { isNil } from 'lodash';
import React from 'react';

export function required(message = 'This is a required field') {

    return value => {
        if(isNil(value)) {
            return message;
        }
        let parsedValue = value;
        if(typeof parsedValue === 'boolean') {
            return undefined;
        }
        if(typeof parsedValue === 'string' && parsedValue.trim() === '') {
            return message;
        }
        if(Array.isArray(parsedValue)) {
            const [startDate, endDate] = parsedValue;
            if(startDate instanceof Date && endDate instanceof Date) {
                return undefined;
            }
        }
        if(typeof parsedValue === 'object' && parsedValue !== null) {
            if(parsedValue instanceof Date) {
                return undefined;
            }
            if(parsedValue.name !== undefined) {
                if(parsedValue.value === '' || parsedValue._id === '') {
                    return message;
                }
                return undefined;
            }
            if(parsedValue.label !== undefined) {
                if(parsedValue.value === '' && parsedValue.label === '') {
                    return message;
                }
                return undefined;
            }
            if(!isNil(parsedValue.value)) {
                parsedValue = parsedValue.value;
            }
            else {
                return message;
            }
        }

        return parsedValue ? undefined : message;
    };
}

export function validateAll(...validators) {
    return async value => {
        const errors = (await Promise.all(validators.map((validate) => validate(value)))).filter(e => e);

        return errors.length === 0 ? null : formatErrors(errors);
    };
}

export function validateAllWithErrorHandling(validators, errorCallback = console.error) {
    return (values) =>
        validateAll(...validators)(values).catch(error => {
            errorCallback(error);
            return error.message;
        });
}

export function formatErrors(errors) {
    return (
        <>
            {errors.map((e, index) => (
                <p key={typeof e === 'string' ? e : index}>{e}</p>
            ))}
        </>
    );
}
