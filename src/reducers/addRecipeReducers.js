export const openAddRecipeModalReducer = (state = false, action) => {
    if (action.type === 'OPEN_ADD_RECIPE_MODAL') {
        return action.payload;
    }

    return state;
};;

export const uploadRecipeReducer = (state = {}, action) => {
    if (action.type === 'UPLOAD_RECIPE') {
        return action.payload;
    }
    if (action.type === 'CLEAR_ADD_RECIPE_MODAL') {
        return {};
    }

    return state;
};