import React from 'react';
import {LockClosedIcon} from "@heroicons/react/solid";
import classNames from 'classnames';

import { LoadingSpinner } from '../../assets/icons';

export function Button({text, children, loading, disabled, secondary, ...rest}) {
    return (
        <button
            className={classNames(
                'relative flex items-center justify-center w-full p-3 mt-6 overflow-hidden text-base h-12 text-white font-medium select-none min-h-12 rounded-md transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-opacity-50',
                { 'opacity-50 cursor-not-allowed': disabled },
                    disabled
                    ? 'bg-green-300'
                    : 'bg-green-500'
            )}
            type="submit"
            {...rest}
        >

            {loading ? <LoadingSpinner className="absolute w-8 animate-spin" /> : text}
        </button>
    );
}
