export const regionReducer = (state = '', action) => {
    switch (action.type) {
        case 'LOAD_REGION':
            return action.region;
        default:
            return state;
    }
}