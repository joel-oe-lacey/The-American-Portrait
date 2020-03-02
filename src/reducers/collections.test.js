import { collectionsReducer } from './collections';
import { mockDataPrimary, mockDataSecondary } from '../utils/referenceData';

describe('collectionsReducer', () => {

    it('should have an initial state of an empty array', () => {
        const expected = []
        const result = collectionsReducer(undefined, {})

        expect(result).toEqual(expected)
    })

    it('should be able to load an entire collection', () => {
        const mockState = []
        const collection = [mockDataPrimary]
        const mockAction = {
            type: 'LOAD_COLLECTION',
            collection
        }
        const expected = collection;

        const result = collectionsReducer(mockState, mockAction)

        expect(result).toEqual(expected)
    })

    it('should be able to join subsequent collections', () => {
        const mockState = [mockDataPrimary]
        const collection = [mockDataSecondary]
        const mockAction = {
            type: 'LOAD_SUBSQ_COLLECTION',
            collection
        }
        const expected = [mockDataPrimary, mockDataSecondary]

        const result = collectionsReducer(mockState, mockAction)

        expect(result).toEqual(expected)
    })
})