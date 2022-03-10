// Action Creators for Rendering Spinners
export const renderSearchSpinner = (isLoading) => {
    return {
        type: 'RENDER_SEARCH_SPINNER',
        payload: isLoading
    };
};

export const renderRecipeSpinner = (isLoading) => {
    return {
        type: 'RENDER_RECIPE_SPINNER',
        payload: isLoading
    };
};
export const renderUploadSpinner = (isLoading) => {
    return {
        type: 'RENDER_UPLOAD_SPINNER',
        payload: isLoading
    };
};