import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipeList, openAddRecipeModal } from '../actions';
import { searchError } from '../actions/renderErrors';
import { renderSearchSpinner } from '../actions/renderSpinners';
import NavItem from './NavItem';

class HeaderView extends Component {
    navobjects = [
        { text: 'Add recipe', iconTag: 'edit', class: 'add-recipe', children: false, key: 1 },
        { text: 'Bookmarks', iconTag: 'bookmark', class: 'bookmarks', children: true, key: 2 }
    ];
    state = { navItems: [], searchText: '' };

    componentDidMount = () => {
        this.searchInputRef = React.createRef();
        this.setState({
            navItems: this.navobjects.map(
                obj => {
                    return (
                        <NavItem
                            key={ obj.key }
                            iconTag={ obj.iconTag }
                            text={ obj.text }
                            className={ obj.class }
                            children={ obj.children }
                        />
                    );
                }
            )
        });
    };

    navButtonClickHandler = (e) => {
        const btn = e.target.closest('.nav__btn--add-recipe');

        if (!btn) return;

        this.props.openAddRecipeModal(true);
    };


    searchInputHandler = (e) => {
        this.setState({
            searchText: e.target.value
        });
    };

    onSearch = (e) => {
        e.preventDefault();
        this.loadSearchResults(this.state.searchText);
        this.setState({ searchText: '' });
        this.searchInputRef.current.blur();
    };

    loadSearchResults = async (query) => {
        try {

            this.props.renderSearchSpinner(true);
            // 
            this.props.searchError(false);
            if (!query) {
                this.props.renderSearchSpinner(false);
                return;
            }

            await this.props.fetchRecipeList(query);

            this.props.renderSearchSpinner(false);

        } catch (err) {

            this.props.renderSearchSpinner(false);
            this.props.searchError(true, err.toString());
        }
    };

    render() {
        console.log('HEADERRRR--VEW', this.props);
        return (

            <header className='header' >
                <img src='./logo.png' alt='logo' className='header__logo' />
                <form className="search" onSubmit={ this.onSearch }>
                    <input
                        type="text"
                        className="search__field"
                        placeholder="Search over 1,000,000 recipes..."
                        onChange={ this.searchInputHandler }
                        value={ this.state.searchText }
                        ref={ this.searchInputRef }
                    />
                    <button className="btn search__btn" onClick={ this.onSearch }>
                        <svg className="search__icon">
                            <use href="icons.svg#icon-search"></use>
                        </svg>
                        <span>Search</span>
                    </button>
                </form>
                <nav className='nav' onClick={ this.navButtonClickHandler }>
                    <ul className='nav__list'>
                        { this.state.navItems }
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('HEADERRRR--VEW-STATE', state);
    return {
        // search: state.searchRecipe,
        recipeList: state.recipeList,
        modalOpen: state.openModal
    };
};



export default connect(mapStateToProps, {
    searchError,
    renderSearchSpinner,
    fetchRecipeList,
    openAddRecipeModal
})(HeaderView);