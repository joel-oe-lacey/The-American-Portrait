export const regionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_REGIONS':
            return action.regions;
        default:
            return state;
    }
}