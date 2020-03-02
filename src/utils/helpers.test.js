import { restructureArtPiece, bucketArtByDate, recompileCollection } from './helpers';
import { mockRawCollection, mockFilteredCollection, mockCollectionPrimary, mockCollectionSecondary } from './referenceData';

describe('restructureArtPiece', () => {
    it('should extract relevant fields from larger data fetch', () => {
        const rawData = mockRawCollection;
        const expected = mockFilteredCollection;
        const restructureTest = restructureArtPiece(rawData);

        expect(restructureTest).toEqual(expected);
    })
})

describe('bucketArtByDate', () => {
    it('should reduce down raw collection list into chronological groups by decade', () => {
        const rawData = [mockCollectionPrimary, mockCollectionSecondary, mockFilteredCollection];
        const expected = {
            "toEighteenHundreds": [],
            "toEighteenFiftys": [],
            "toEighteenEighty": [],
            "toNineteenHundreds": [],
            "toNineteenTwenties": [],
            "toNineteenFourties": [],
            "toNineteenSixties": [],
            "toNineteenEighties": [mockCollectionPrimary, mockCollectionSecondary],
            "toTwoThousands": [mockFilteredCollection],
            "toTwentyTwenties": [],
        }
        const bucketTest = bucketArtByDate(rawData);

        expect(bucketTest).toEqual(expected);
    })
    
    it('should have a limit of 10 pieces per decade', () => {
        const rawData = [{ id: 1, dateend: 1870 }, 
            { id: 2, dateend: 1865 }, 
            { id: 3, dateend: 1863 },
            { id: 4, dateend: 1872 },
            { id: 5, dateend: 1877 },
            { id: 6, dateend: 1877 },
            { id: 7, dateend: 1879 },
            { id: 8, dateend: 1880 },
            { id: 9, dateend: 1861 },
            { id: 10, dateend: 1868 },
            { id: 11, dateend: 1873 }];
        const expected = {
            "toEighteenHundreds": [],
            "toEighteenFiftys": [],
            "toEighteenEighty": [{ id: 1, dateend: 1870 },
            { id: 2, dateend: 1865 },
            { id: 3, dateend: 1863 },
            { id: 4, dateend: 1872 },
            { id: 5, dateend: 1877 },
            { id: 6, dateend: 1877 },
            { id: 7, dateend: 1879 },
            { id: 8, dateend: 1880 },
            { id: 9, dateend: 1861 },
            { id: 10, dateend: 1868 }],
            "toNineteenHundreds": [],
            "toNineteenTwenties": [],
            "toNineteenFourties": [],
            "toNineteenSixties": [],
            "toNineteenEighties": [],
            "toTwoThousands": [],
            "toTwentyTwenties": [],
        }
        const bucketTest = bucketArtByDate(rawData);

        expect(bucketTest).toEqual(expected);
    })

    describe('recompileCollection', () => {
        it('should restructure bucketed Pieces into a collections array', () => {
            const rawData = [mockCollectionPrimary, mockCollectionSecondary, mockFilteredCollection];
            const bucketedData = bucketArtByDate(rawData);
            const restructureTest = recompileCollection(bucketedData);
            const expected = [mockCollectionSecondary, mockCollectionPrimary, mockFilteredCollection];

            expect(restructureTest).toEqual(expected);
        })
    })
})