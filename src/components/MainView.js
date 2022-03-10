import React from 'react';
import AddRecipeModal from './AddRecipeModal';
import RecipeView from './RecipeView';
import SearchResultsPane from './SearchResultsPane';

const MainView = () => {
    return (
        <React.Fragment>
            <SearchResultsPane />
            <RecipeView />
            <AddRecipeModal />
        </React.Fragment>
    );
};

export default MainView;