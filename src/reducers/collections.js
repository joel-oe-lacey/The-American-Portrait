export const collectionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_COLLECTION':
            return action.collection;
        case 'LOAD_SUBSQ_COLLECTION':
            return [...state, ...action.collection];
        default:
            return state;
    }
}