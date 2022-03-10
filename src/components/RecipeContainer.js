import React from 'react';

const RecipeContainer = (props) => {
    return (
        <div className='recipe'>
            { props.children }
        </div>
    );
};

export default RecipeContainer;