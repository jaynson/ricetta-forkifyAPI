import { API_KEY, API_URL } from "../utility/config";
import { createRecipeObject, getJSON, sendJSON } from "../utility/helper";


//Action Creator for Creating new Recipes
export const createNewRecipe = (recipe) => {
    const createdRecipe = createRecipeObject(recipe);
    console.log('FROM CREAE NEW REC!!!!!!++++++', createdRecipe);
    return {
        type: 'CREATE_NEW_RECIPE',
        payload: createdRecipe
    };
};

//Action Creator for Fetching Single Recipe
export const fetchRecipe = (id) => async dispatch => {

    try {
        const response = await getJSON(`${API_URL}${id}`);
        let { recipe } = response.data;
        const fetchedRecipe = createRecipeObject(recipe);
        console.log('FROM FETCH RECIPE fetchedRecipe', fetchedRecipe);

        dispatch({ type: 'FETCH_RECIPE', payload: fetchedRecipe });
    } catch (err) {
        throw err;
    }
};

//Action Creator for Fetching Single Recipe
export const fetchRecipeList = (searchTerm) => async dispatch => {

    try {
        const response = await getJSON(`${API_URL}?search=${searchTerm}`);
        if (!response ||
            (Array.isArray(response.data.recipes) &&
                response.data.recipes.length === 0)) {
            console.log('Throwing Errorrrrrrrrr');
            throw new Error('No recipes found. Please try another term!');
        }
        const searchResults = response.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                imageUrl: rec.image_url,
                publisher: rec.publisher
            };
        });

        dispatch({
            type: 'FETCH_RECIPE_LIST',
            payload: {
                query: searchTerm,
                result: searchResults
            }
        });

    } catch (err) {
        throw err;
    }
};

//Action Creator for Opening Modal
export const openAddRecipeModal = (opened) => {
    return {
        type: 'OPEN_ADD_RECIPE_MODAL',
        payload: opened
    };
};

//Action Creator for reseting add recipe modal
export const clearAddRecipeModal = () => {
    return {
        type: 'CLEAR_ADD_RECIPE_MODAL',
    };
};

//Action Creator for Adding Single Recipe
export const uploadRecipe = (newRecipe) => async dispatch => {

    try {
        // const response = await getJSON(`${API_URL}${id}`);
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                // const ingArr = ing[1].replaceAll(' ', '').split(',');
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient fromat! Please use the correct format :)'
                    );

                const [quantity, unit, description] = ingArr;

                return { quantity: quantity ? +quantity : null, unit, description };
            });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };
        console.log('From upload fn', recipe);
        const response = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
        console.log('From UPload fn RESULT', response);

        dispatch({ type: 'UPLOAD_RECIPE', payload: response.data.recipe });
    } catch (err) {
        throw err;
    }
};


export const updateServings = (newServings) => {
    return {
        type: 'UPDATE_SERVINGS',
        payload: newServings
    };
};


