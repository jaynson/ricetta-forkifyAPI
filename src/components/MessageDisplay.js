import React from 'react';

const MessageDisplay = ({ message, iconTag, className }) => {
    return (
        <div className={ `${className}` }>
            <div>
                <svg>
                    <use href={ `icons.svg#icon-${iconTag}` }></use>
                </svg>
            </div>
            <p>{ message }</p>
        </div>
    );
};

export default MessageDisplay;