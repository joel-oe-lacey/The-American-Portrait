export const collectionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_COLLECTION':
            return action.collection;
        default:
            return state;
    }
}