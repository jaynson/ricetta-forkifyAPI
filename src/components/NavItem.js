import React from 'react';
import BookmarksView from './BookmarksView';

const NavItem = ({ text, iconTag, className, children }) => {
    return (
        <li className="nav__item">
            <button className={ `nav__btn nav__btn--${className}` }>
                <svg className="nav__icon">
                    <use href={ `./icons.svg#icon-${iconTag}` }></use>
                </svg>
                <span>{ text }</span>
            </button>
            { children && <BookmarksView /> }
        </li>
    );
};

export default NavItem;