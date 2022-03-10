import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner">
            <svg>
                <use href="icons.svg#icon-loader"></use>
            </svg>
        </div>
    );
};

export default Spinner;