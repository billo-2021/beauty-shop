import React from 'react';
import classNames from 'classnames';

export function FormField({name, label, hide, children}) {
    return (
        <div className={classNames({hidden: hide}, 'flex-1 block mb-4')}>
            <label htmlFor={name} className="block text-sm font-medium text-black">
                {label}
            </label>
            {children}
        </div>
    );
}
