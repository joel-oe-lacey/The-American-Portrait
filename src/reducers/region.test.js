import { regionReducer } from './region';

describe('regionReducer', () => {

    it('should have an initial state of an empty string', () => {
        const expected = '';
        const result = regionReducer(undefined, {});

        expect(result).toEqual(expected);
    })

    it('should be able to load a region', () => {
        const mockState = '';
        const region = 'Colorado';
        const mockAction = {
            type: 'LOAD_REGION',
            region
        }
        const expected = region;

        const result = regionReducer(mockState, mockAction)

        expect(result).toEqual(expected)
    })
})