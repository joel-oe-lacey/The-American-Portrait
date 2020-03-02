import { collectionsReducer } from './collections';

describe('collectionsReducer', () => {

    it('should have an initial state of an empty array', () => {
        const expected = []
        const result = collectionsReducer(undefined, {})

        expect(result).toEqual(expected)
    })

    it('should be able to load an entire collection', () => {
        const mockState = [
        ]
        const piece = [
            {
            }
        ]
        const mockAction = {

        }
        const expected = [
        ]
        const result = collectionsReducer(mockState, mockAction)

        expect(result).toEqual(expected)
    })
})