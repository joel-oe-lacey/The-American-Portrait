import * as actions from '../actions';
import {mockDataPrimary, mockDataSecondary } from '../utils/referenceData';

describe('actions', () => {
    it('should have a type of LOAD_REGION', () => {
        const region = 'Colorado';

        const result = actions.loadRegion(region)
        const expectedAction = {
            type: 'LOAD_REGION',
            region
        }

        expect(result).toEqual(expectedAction);
    })

    it('should have a type of LOAD_COLLECTION', () => {
        const collection = mockDataPrimary;

        const result = actions.loadCollection(collection)
        const expectedAction = {
            type: 'LOAD_COLLECTION',
            collection
        }

        expect(result).toEqual(expectedAction);
    })

    it('should have a type of LOAD_SUBSQ_COLLECTION', () => {
        const collection = mockDataSecondary;

        const result = actions.loadSubsqCollection(collection)
        const expectedAction = {
            type: 'LOAD_SUBSQ_COLLECTION',
            collection
        }

        expect(result).toEqual(expectedAction);
    })
});
