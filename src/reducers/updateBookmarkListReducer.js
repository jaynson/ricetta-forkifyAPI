export default (state = [], action) => {
    if (action.type === 'UPDATE_BOOKMARK_LIST') {
        switch (action.payload.operation) {
            case 'add':
                return [action.payload.recipe, ...state];
            case 'remove':
                return state.filter(rec => rec.id !== action.payload.recipe.id);
            default:
                return;
        }

    }
    return state;
};;
// export default (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_BOOKMARK':
//             return [action.payload, ...state];
//         case 'REMOVE_BOOKMARK':
//             return state.filter(rec => rec.id !== action.payload.id);
//         default:
//             return state;
//     }
// }