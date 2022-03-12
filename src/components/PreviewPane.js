import React from 'react';

const PreviewPane = ({ rec }) => {
    return (
        <li className="preview" key={ rec.id }>
            <a className="preview__link preview__link--active" href={ `#${rec.id}` }>
                <figure className="preview__fig">
                    <img src={ rec.imageUrl } alt="Test" />
                </figure>
                <div className="preview__data">
                    <h4 className="preview__title">{ rec.title }</h4>
                    <p className="preview__publisher">{ rec.publisher }</p>
                    <div className={ `preview__user-generated ${rec.key ? '' : 'hidden'}` }>
                        <svg>
                            <use href="icons.svg#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default PreviewPane;