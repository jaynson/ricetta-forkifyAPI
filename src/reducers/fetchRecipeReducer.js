export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_RECIPE':
            return action.payload;
        case 'CREATE_NEW_RECIPE':
            return action.payload;
        case 'UPDATE_SERVINGS':
            return { ...state, servings: action.payload };
        case 'BOOKMARK_RECIPE':
            return { ...state, bookmarked: action.payload };
        default:
            return state;
    }
}