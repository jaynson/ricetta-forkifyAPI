import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageDisplay from './MessageDisplay';
import Recipe from './Recipe';
import RecipeContainer from './RecipeContainer';
import Spinner from './Spinner';


class RecipeView extends Component {

    render() {
        console.log('RECCCIIIIPEE--VIEEWW', this.props);

        if (Object.keys(this.props.recipe).length === 0 &&
            this.props.recipe.constructor === Object &&
            !this.props.isLoading) {
            return (
                <RecipeContainer>
                    <MessageDisplay
                        message='Search for a recipe or an ingredient then select one. Have fun!'
                        iconTag='smile'
                        className='message'
                    />
                </RecipeContainer>
            );
        }

        if (this.props.recipe && !this.props.isLoading) {
            return (
                <RecipeContainer >
                    <Recipe recipe={ this.props.recipe } />
                </RecipeContainer>
            );
        }
        if (this.props.errThrown.isThrown) {
            return (
                <RecipeContainer>
                    <MessageDisplay
                        message={ this.props.errThrown.errText }
                        iconTag='alert-triangle'
                        className='error'
                    />
                </RecipeContainer>
            );
        }
        return (
            <RecipeContainer>
                <Spinner />
            </RecipeContainer>
        );

        ;

    }
}

const mapStateToProps = state => {
    console.log('RECCCIIIIPEE--VIEEWWSTATE', state);

    return {
        recipe: state.recipe,
        isLoading: state.recipeSpinner,
        errThrown: state.recipeError,
    };
};

export default connect(mapStateToProps)(RecipeView);