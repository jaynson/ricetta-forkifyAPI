// Action Creators for Displaying Errors in UI
export const recipeError = (errorThrown, message = '') => {
    return {
        type: 'RECIPE_ERROR',
        payload: { isThrown: errorThrown, errText: message }
    };
};

export const searchError = (errorThrown, message = '') => {
    return {
        type: 'SEARCH_ERROR',
        payload: { isThrown: errorThrown, errText: message }
    };
};

export const uploadError = (errorThrown, message = '') => {
    return {
        type: 'UPLOAD_ERROR',
        payload: { isThrown: errorThrown, errText: message }
    };
};