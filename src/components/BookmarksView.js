import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateBookmarkList } from '../actions/addBookmarks';
import MessageDisplay from './MessageDisplay';

const BookmarksView = (props) => {
    console.log('BOOOKMARKSVEUUUUU', props);

    useEffect(() => {
        const storage = localStorage.getItem('bookmarks');
        console.log('PLEEEEEEEEEEEEEEEEEEEEEEEEEEE', storage);
        if (storage) {
            console.log(JSON.parse(storage));
            JSON.parse(storage).forEach(
                item => props.updateBookmarkList('add', item)
            );
        }
    }, []);

    const generateBookmarkPreview = () => {
        if (props.bookmarkList.length > 0) {
            return props.bookmarkList.map(preview => {
                return (
                    <li className="preview" key={ preview.id }>
                        <a className="preview__link" href={ `#${preview.id}` }>
                            <figure className="preview__fig">
                                <img src={ preview.imageUrl } alt="Recipe preview" />
                            </figure>
                            <div className="preview__data">
                                <h4 className="preview__name">
                                    { preview.title }
                                </h4>
                                <p className="preview__author">{ preview.publisher }</p>
                            </div>
                        </a>
                    </li>
                );
            });
        }
    };
    return (
        <div className='bookmarks'>
            <ul className='bookmarks__list'>
                {
                    (props.bookmarkList.length > 0) ? generateBookmarkPreview() :
                        <MessageDisplay
                            className='message'
                            iconTag='smile'
                            message='No bookmarks yet. Find a nice recipe and bookmark it :)'
                        />

                }
                {/* TODO PREVIEW LIST */ }
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        bookmarkList: state.bookmarkList
    };
};

export default connect(mapStateToProps, {
    updateBookmarkList
})(BookmarksView);