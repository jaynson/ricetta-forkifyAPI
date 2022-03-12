import React, { Component } from 'react';
import { Fraction } from 'fractional';
import { connect } from 'react-redux';
import { bookmarkRecipe, updateBookmarkList } from '../actions/addBookmarks';
import { updateServings } from '../actions';
import { persistBookmarks } from '../utility/helper';


class Recipe extends Component {

    state = { bookmarked: this.props.bookmarkList.some(rec => rec.id === this.props.recipe.id) };

    componentDidMount = () => {

    };

    componentDidUpdate = (prevProps, prevState) => {

        // if (prevProps.recipe.id !== this.props.recipe.id) {
        //     console.log('Checking', prevProps.recipe, this.props.recipe);
        //     this.props.bookmarkRecipe(this.props.bookmarkList.some(rec => rec.id === this.props.recipe.id));


        // }


        if (prevState.bookmarked !== this.state.bookmarked) {
            if (!this.state.bookmarked) {
                this.props.updateBookmarkList('remove', this.props.recipe);
            } else {
                if (!this.props.bookmarkList.some(
                    rec => rec.id === this.props.recipe.id
                ))
                    this.props.updateBookmarkList('add', this.props.recipe);
            }
        }
        persistBookmarks(this.props.bookmarkList);
    };


    updateIngredientQuantities = (newServings) => {

        if (this.props.recipe) {
            // const updatedRecipe = { ...this.props.recipe };
            this.props.recipe.ingredients.forEach(
                ing => {
                    ing.quantity = ing.quantity * (newServings / this.props.recipe.servings);
                }
            );
            this.props.updateServings(newServings);

        }
    };

    updateRecipeHandler = (e) => {
        const btnServings = e.target.closest('.btn--update-servings');
        const btnBookmark = e.target.closest('.btn--round');
        if (!btnServings && !btnBookmark) return;

        let newServings = this.props.recipe.servings;
        if (btnServings && btnServings.classList.contains('btn--increase-servings')) {
            newServings++;
        }
        if (btnServings && btnServings.classList.contains('btn--decrease-servings')) {
            (newServings > 1) && newServings--;
        }
        if (btnBookmark) {
            console.log('BOOKMARKERSSSSSSSS');

            this.setState({ bookmarked: !this.state.bookmarked });
            this.props.bookmarkRecipe(!this.state.bookmarked);
            return;
        }
        this.updateIngredientQuantities(newServings);
    };


    generateIngredient = () => {
        return this.props.recipe.ingredients?.map((ing, i) => {
            return (
                <li className="recipe__ingredient" key={ i }>
                    <svg className="recipe__icon">
                        <use href="icons.svg#icon-check"></use>
                    </svg>
                    <div className="recipe__quantity">{ ing.quantity ? new Fraction(ing.quantity).toString() : '' }</div>
                    <div className="recipe__description">
                        <span className="recipe__unit">{ `${ing.unit} ` }</span>
                        { ing.description }
                    </div>
                </li>
            );
        });

    };


    render() {
        return (
            <React.Fragment>
                <figure className="recipe__fig">
                    <img src={ `${this.props.recipe.imageUrl}` } alt="Tomato" className="recipe__img" />
                    <h1 className="recipe__title">
                        <span>{ this.props.recipe.title }</span>
                    </h1>
                </figure>

                <div className="recipe__details" onClick={ this.updateRecipeHandler }>
                    <div className="recipe__info">
                        <svg className="recipe__info-icon">
                            <use href="icons.svg#icon-clock"></use>
                        </svg>
                        <span className="recipe__info-data recipe__info-data--minutes">{ this.props.recipe.cookingTime }</span>
                        <span className="recipe__info-text">minutes</span>
                    </div>
                    <div className="recipe__info">
                        <svg className="recipe__info-icon">
                            <use href="icons.svg#icon-users"></use>
                        </svg>
                        <span className="recipe__info-data recipe__info-data--people">{ this.props.recipe.servings }</span>
                        <span className="recipe__info-text">{ `${(this.props.recipe.servings > 1) ? 'servings' : 'serving'}` }</span>

                        <div className="recipe__info-buttons">
                            <button className="btn--tiny btn--update-servings btn--decrease-servings">
                                <svg>
                                    <use href="icons.svg#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button className="btn--tiny btn--update-servings btn--increase-servings">
                                <svg>
                                    <use href="icons.svg#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={ `recipe__user-generated ${this.props.recipe.key ? '' : 'hidden'}` }>
                        <svg>
                            <use href="icons.svg#icon-user"></use>
                        </svg>
                    </div>
                    <button className="btn--round">
                        <svg className="">
                            <use href={
                                `icons.svg#icon-bookmark${(
                                    this.props.bookmarkList.some(
                                        rec => rec.id === this.props.recipe.id
                                    )
                                ) ? '-fill' : ''
                                }`
                            }></use>
                        </svg>
                    </button>
                </div>

                <div className="recipe__ingredients">
                    <h2 className="heading--2">Recipe ingredients</h2>
                    <ul className="recipe__ingredient-list">
                        { this.generateIngredient() }
                    </ul>
                </div>

                <div className="recipe__directions">
                    <h2 className="heading--2">How to cook it</h2>
                    <p className="recipe__directions-text">
                        This recipe was carefully designed and tested by { ` ` }
                        <span className="recipe__publisher">{ this.props.recipe.publisher }</span>. Please check out
                        directions at their website.
                    </p>
                    <a
                        className="btn--small recipe__btn"
                        href={ `${this.props.recipe.sourceUrl}` }
                        target="_blank"
                    >
                        <span>Directions</span>
                        <svg className="search__icon">
                            <use href="icons.svg#icon-arrow-right"></use>
                        </svg>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookmarkList: state.bookmarkList
    };
};

export default connect(mapStateToProps, {
    updateServings,
    bookmarkRecipe,
    updateBookmarkList
})(Recipe);