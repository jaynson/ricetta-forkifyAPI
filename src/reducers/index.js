import { combineReducers } from "redux";
import fetchRecipeListReducer from "./fetchRecipeListReducer";
import fetchRecipeReducer from "./fetchRecipeReducer";
import updateBookmarkListReducer from "./updateBookmarkListReducer";
import { openAddRecipeModalReducer, uploadRecipeReducer } from "./addRecipeReducers";


const renderSearchSpinnerReducer = (isLoading = false, action) => {
    if (action.type === 'RENDER_SEARCH_SPINNER') return action.payload;
    return isLoading;
};

const renderRecipeSpinnerReducer = (isLoading = false, action) => {
    if (action.type === 'RENDER_RECIPE_SPINNER') return action.payload;
    return isLoading;
};
const renderUploadSpinnerReducer = (isLoading = false, action) => {
    if (action.type === 'RENDER_UPLOAD_SPINNER') return action.payload;
    return isLoading;
};

const recipeErrorReducer = (errThrown = {
    isThrown: false, errText: ''
}, action) => {
    if (action.type === 'RECIPE_ERROR') return action.payload;
    return errThrown;
};

const uploadErrorReducer = (errThrown = {
    isThrown: false, errText: ''
}, action) => {
    if (action.type === 'UPLOAD_ERROR') return action.payload;
    return errThrown;
};

const searchErrorReducer = (errThrown = {
    isThrown: false, errText: ''
}, action) => {
    if (action.type === 'SEARCH_ERROR') return action.payload;
    return errThrown;
};

export default combineReducers({
    searchSpinner: renderSearchSpinnerReducer,
    recipeSpinner: renderRecipeSpinnerReducer,
    uploadSpinner: renderUploadSpinnerReducer,
    recipeError: recipeErrorReducer,
    uploadError: uploadErrorReducer,
    searchError: searchErrorReducer,
    bookmarkList: updateBookmarkListReducer,
    recipe: fetchRecipeReducer,
    recipeList: fetchRecipeListReducer,
    openModal: openAddRecipeModalReducer,
    uploadRecipe: uploadRecipeReducer
});

