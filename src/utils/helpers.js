export const restructureArtPiece = (rawArtData) => {
    const {
        title,
        objectid,
        creditline,
        century,
        technique,
        dateend,
        dated,
        people,
        primaryimageurl
    } = rawArtData;

    return {
        title,
        objectid,
        creditline,
        century,
        technique,
        dateend,
        dated,
        people,
        primaryimageurl
    }
}

export const checkRecordDataAvailability = (dataCollection) => {
    return dataCollection.records.reduce((restrCollection, item) => {
        if (item.primaryimageurl && item.dateend) {
            restrCollection.push(restructureArtPiece(item))
        }
        return restrCollection;
    }, [])
}

export const recompileCollection = (bucketedCollection) => {
    return Object.keys(bucketedCollection).reduce((flatColl, dateKey) => {
        flatColl = flatColl.concat(bucketedCollection[dateKey])
        return flatColl;
    }, []).sort((a, b) => a.dateend - b.dateend)
}

export const bucketArtByDate = (allArt) => {
    return allArt.reduce((bucketedArt, piece) => {
        const date = piece.dateend;
        switch(true) {
            case (date < 1800): 
                if (bucketedArt.toEighteenHundreds.length < 10) {
                    bucketedArt.toEighteenHundreds.push(piece)
                }
                break;
            case (date <= 1850):
                if (bucketedArt.toEighteenFiftys.length < 10) {
                    bucketedArt.toEighteenFiftys.push(piece)
                }
                break;
            case (date <= 1880):
                if (bucketedArt.toEighteenEighty.length < 10) {
                    bucketedArt.toEighteenEighty.push(piece)
                }
                break;
            case (date <= 1900):
                if (bucketedArt.toNineteenHundreds.length < 10) {
                    bucketedArt.toNineteenHundreds.push(piece)
                }
                break;
            case (date <= 1920):
                if (bucketedArt.toNineteenTwenties.length < 10) {
                    bucketedArt.toNineteenTwenties.push(piece)
                }
                break;
            case (date <= 1940):
                if (bucketedArt.toNineteenFourties.length < 10) {
                    bucketedArt.toNineteenFourties.push(piece)
                }
                break;
            case (date <= 1960):
                if (bucketedArt.toNineteenSixties.length < 10) {
                    bucketedArt.toNineteenSixties.push(piece)
                }
                break;
            case (date <= 1980):
                if (bucketedArt.toNineteenEighties.length < 10) {
                    bucketedArt.toNineteenEighties.push(piece)
                }
                break;
            case (date <= 2000):
                if (bucketedArt.toTwoThousands.length < 10) {
                    bucketedArt.toTwoThousands.push(piece)
                }
                break;
            case (date <= 2020):
                if (bucketedArt.toTwentyTwenties.length < 10) {
                    bucketedArt.toTwentyTwenties.push(piece)
                }
                break;
            default:
                break;
        }
        return bucketedArt;
    }, {
        "toEighteenHundreds": [],
        "toEighteenFiftys": [],
        "toEighteenEighty": [],
        "toNineteenHundreds": [],
        "toNineteenTwenties": [],
        "toNineteenFourties": [],
        "toNineteenSixties": [],
        "toNineteenEighties": [],
        "toTwoThousands": [],
        "toTwentyTwenties": [],
    })
}

