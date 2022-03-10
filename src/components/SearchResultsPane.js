import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../actions';
import { recipeError } from '../actions/renderErrors';
import { renderRecipeSpinner } from '../actions/renderSpinners';
import { RESULTS_PER_PAGE } from '../utility/config';
import MessageDisplay from './MessageDisplay';
import Spinner from './Spinner';

class SearchResultsPane extends Component {
    state = { pageNum: 1 };

    constructor(props) {
        super(props);
        this.prevButtonRef = React.createRef();
        this.nextButtonRef = React.createRef();
    }

    componentDidMount = () => {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, this.handleHashChange));
    };

    componentDidUpdate = (prevProps, prevState) => {
        console.log('PAAAGEEEENUUUMMM', this.state.pageNum);
        if (prevProps.search.query !== this.props.search.query) {
            this.setState({ pageNum: 1 });
        }

        // this.props.bookmarkRecipe(this.props.bookmarkList.some(rec => rec.id === this.props.recipe.id));

    };

    handleHashChange = async () => {
        try {
            this.props.renderRecipeSpinner(true);
            const id = window.location.hash.slice(1);
            if (!id) {
                this.props.renderRecipeSpinner(false);
                return;
            };
            this.props.recipeError(false);
            await this.props.fetchRecipe(id);
            this.props.renderRecipeSpinner(false);
        } catch (err) {
            this.props.recipeError(true, "We can't find that recipe. Please try again!");
        }
    };

    onPaginationClicked = (e) => {

        const btnClicked = e.target.closest('.btn--inline');

        if (!btnClicked) return;

        if (btnClicked === this.prevButtonRef.current) {
            this.setState((state) => {
                return { pageNum: state.pageNum - 1 };
            });
        }
        if (btnClicked === this.nextButtonRef.current) {
            this.setState((state) => {
                return { pageNum: state.pageNum + 1 };
            });
        }


    };

    getSearchResultsPage = (page) => {
        const start = (page - 1) * RESULTS_PER_PAGE;
        const end = page * RESULTS_PER_PAGE;

        return this.props.search.result.slice(start, end).map(rec => {
            return (
                <li className="preview" key={ rec.id }>
                    <a className="preview__link preview__link--active" href={ `#${rec.id}` }>
                        <figure className="preview__fig">
                            <img src={ rec.imageUrl } alt="Test" />
                        </figure>
                        <div className="preview__data">
                            <h4 className="preview__title">{ rec.title }</h4>
                            <p className="preview__publisher">{ rec.publisher }</p>
                            {/* <div className="preview__user-generated">
                                <svg>
                                    <use href="icons.svg#icon-user"></use>
                                </svg>
                            </div> */}
                        </div>
                    </a>
                </li>
            );
        });
    };

    render() {
        console.log('SPINNAZZZZZZZZZZZZZ', this.props);
        if (this.props.errThrown.isThrown) {
            return (
                <MessageDisplay
                    message={ this.props.errThrown.errText }
                    iconTag='alert-triangle'
                    className='error'
                />
            );
        }

        if (!this.props.search.result && !this.props.isLoading) {
            return (
                <MessageDisplay
                    message={ 'Recipe List will display here!' }
                    iconTag='smile'
                    className='message'
                />
            );
        }

        if (this.props.search.result && !this.props.isLoading) {
            return (
                <div className='search-results'>
                    <ul className='results'>
                        {/* { this.populateResults() } */ }
                        { this.getSearchResultsPage(this.state.pageNum) }
                    </ul>
                    <div className='pagination' onClick={ this.onPaginationClicked }>
                        {/**TO DO PAGINATION BUTTONS */ }
                        {
                            (this.state.pageNum > 1) &&
                            (<button
                                className="btn--inline pagination__btn--prev"
                                ref={ this.prevButtonRef }
                            >
                                <svg className="search__icon">
                                    <use href="icons.svg#icon-arrow-left"></use>
                                </svg>
                                <span>{ `Page${this.state.pageNum - 1}` }</span>
                            </button>)
                        }

                        {
                            (this.props.search.result.length > 0) &&
                            (<span className='current-page'>
                                {
                                    `${this.state.pageNum} of ${Math.ceil(this.props.search.result.length / RESULTS_PER_PAGE)}`
                                }
                            </span>)
                        }

                        {
                            (this.state.pageNum < Math.ceil(this.props.search.result.length / RESULTS_PER_PAGE)) &&
                            (<button
                                className="btn--inline pagination__btn--next"
                                ref={ this.nextButtonRef }
                            >
                                <span>{ `Page${this.state.pageNum + 1}` }</span>
                                <svg className="search__icon">
                                    <use href="icons.svg#icon-arrow-right"></use>
                                </svg>
                            </button>)
                        }
                    </div>

                    <p className='copyright'>
                        &copy; Copyright by Jay Uduma, adapted from original project by Jonas Schmedtman
                    </p>
                </div>
            );
        }


        return (
            <Spinner />
        );

    }
}

const mapStateToProps = state => {
    console.log('We STRIVINGSSSSSS', state);
    return {
        search: state.recipeList,
        errThrown: state.searchError,
        isLoading: state.searchSpinner
    };
};

export default connect(
    mapStateToProps,
    {
        renderRecipeSpinner,
        recipeError,
        fetchRecipe
    }
)(SearchResultsPane);