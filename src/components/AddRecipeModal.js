import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { openAddRecipeModal, uploadRecipe, createNewRecipe, clearAddRecipeModal } from '../actions';
import { bookmarkRecipe, updateBookmarkList } from '../actions/addBookmarks';
import { renderUploadSpinner } from '../actions/renderSpinners';
import { uploadError } from '../actions/renderErrors';
import { persistBookmarks } from '../utility/helper';
import MessageDisplay from './MessageDisplay';
import Spinner from './Spinner';

class AddRecipeModal extends Component {

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    // state = { modalOpen: this.props.modalOpen };

    closeModalHandler = () => {
        this.props.openAddRecipeModal(false);
        setTimeout(() => {
            this.props.clearAddRecipeModal();
            this.props.uploadError(false);
        }, 500);

    };

    submitFormHandler = async (e) => {
        e.preventDefault();
        try {
            this.props.renderUploadSpinner(true);
            const dataArr = [...new FormData(this.formRef.current)];
            if (!dataArr) {
                this.props.renderUploadSpinner(false);
                return;
            }
            const data = Object.fromEntries(dataArr);
            console.log('FOOOOOOORRRRRRRRRRRRMMMMMMMMMM***********', data);
            const result = await this.props.uploadRecipe(data);
            console.log('PRIMEEEEE', this.props.uploaded);
            this.props.createNewRecipe(this.props.uploaded);
            this.props.bookmarkRecipe(true);
            this.props.updateBookmarkList('add', this.props.recipe);
            this.props.renderUploadSpinner(false);
            persistBookmarks(this.props.bookmarkList);
        } catch (err) {
            console.log(err);
            this.props.renderUploadSpinner(false);
            this.props.uploadError(true, err.toString());
        }
    };

    renderFormElements = () => {
        return (
            <form className="upload" onSubmit={ this.submitFormHandler } ref={ this.formRef }>
                <div className="upload__column">
                    <h3 className="upload__heading">Recipe data</h3>
                    <label>Title</label>
                    <input defaultValue="Test Title" required name="title" type="text" />
                    <label>URL</label>
                    <input defaultValue="Test SourceURL" required name="sourceUrl" type="text" />
                    <label>Image URL</label>
                    <input defaultValue="Test Image" required name="image" type="text" />
                    <label>Publisher</label>
                    <input defaultValue="Test Publisher" required name="publisher" type="text" />
                    <label>Prep time</label>
                    <input defaultValue="35" required name="cookingTime" type="number" />
                    <label>Servings</label>
                    <input defaultValue="2" required name="servings" type="number" />
                </div>

                <div className="upload__column">
                    <h3 className="upload__heading">Ingredients</h3>
                    <label>Ingredient 1</label>
                    <input
                        defaultValue="0.5,g,Test Ingredient 1"
                        type="text"
                        required
                        name="ingredient-1"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 2</label>
                    <input
                        defaultValue="3,,Test Ingredient 2"
                        type="text"
                        name="ingredient-2"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 3</label>
                    <input
                        defaultValue="6,tbspns,Ingredient 3"
                        type="text"
                        name="ingredient-3"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 4</label>
                    <input
                        defaultValue=",,Ingredient 4"
                        type="text"
                        name="ingredient-4"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 5</label>
                    <input
                        type="text"
                        name="ingredient-5"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 6</label>
                    <input
                        type="text"
                        name="ingredient-6"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                </div>

                <button className="btn upload__btn">
                    <svg>
                        <use href="icons.svg#icon-upload-cloud"></use>
                    </svg>
                    <span>Upload</span>
                </button>
            </form>
        );
    };

    renderError = () => {
        return (
            <MessageDisplay
                message={ `${this.props.errThrown.errText}` }
                iconTag='alert-triangle'
                className='error'
            />
        );
    };

    renderSuccess = () => {
        return (
            <MessageDisplay
                message={ 'Recipe successfully uploaded' }
                iconTag='smile'
                className='message'
            />
        );
    };

    render() {
        console.log('MEEEEEEEEEEEEEEEEEEEEEEEEEE', this.props);
        const isEmptyObject = Object.keys(this.props.uploaded).length === 0 && this.props.uploaded.constructor === Object;
        return (
            <React.Fragment>
                <div
                    className={ `overlay ${!this.props.modalOpen ? 'hidden' : ''}` }
                    onClick={ this.closeModalHandler }
                ></div>
                <div className={ `add-recipe-window ${!this.props.modalOpen ? 'hidden' : ''}` }>
                    <button
                        className="btn--close-modal"
                        onClick={ this.closeModalHandler }
                    >
                        &times;
                    </button>
                    {
                        (this.props.isLoading && isEmptyObject) ?
                            <Spinner /> : (!this.props.isLoading && !isEmptyObject) ?
                                this.renderSuccess() : (this.props.errThrown.isThrown) ?
                                    this.renderError() : this.renderFormElements()
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.openModal,
        uploaded: state.uploadRecipe,
        recipe: state.recipe,
        bookmarkList: state.bookmarkList,
        isLoading: state.uploadSpinner,
        errThrown: state.uploadError

    };
};

export default connect(mapStateToProps, {
    openAddRecipeModal,
    uploadRecipe,
    createNewRecipe,
    bookmarkRecipe,
    updateBookmarkList,
    renderUploadSpinner,
    uploadError,
    clearAddRecipeModal
})(AddRecipeModal);