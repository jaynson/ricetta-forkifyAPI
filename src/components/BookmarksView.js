import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateBookmarkList } from '../actions/addBookmarks';
import MessageDisplay from './MessageDisplay';
import PreviewPane from './PreviewPane';

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
                    <PreviewPane rec={ preview } />
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