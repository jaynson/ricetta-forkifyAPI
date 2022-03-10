//Action Creator for adding bookmarks
export const bookmarkRecipe = (bookmarked) => {
    return {
        type: 'BOOKMARK_RECIPE',
        payload: bookmarked
    };
};



export const updateBookmarkList = (operation, recipe) => {
    return {
        type: 'UPDATE_BOOKMARK_LIST',
        payload: {
            operation: operation,
            recipe: recipe
        }
    };
};