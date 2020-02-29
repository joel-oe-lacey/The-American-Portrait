export class ArtPiece {
    primaryimageurl;
    title;
    objectid;
    description;
    century;
    dated;
    culture;
    classification;
    technique;
    medium;
    colors;
    creditline;
    labeltext;

    constructor(rawArtData) {
        Object.assign(this, rawArtData);
    }
};

export const restructureArtPiece = (rawArtData) => {
    const {
        title,
        titles,
        objectid,
        description,
        provenance,
        commentary,
        labeltext,
        classification,
        creditline,
        century,
        culture,
        medium,
        videos,
        datebegin,
        dateend,
        dated,
        period,
        technique,
        colors,
        primaryimageurl,
        images,
    } = rawArtData;

    return {
        title,
        titles,
        objectid,
        description,
        provenance,
        commentary,
        labeltext,
        classification,
        creditline,
        century,
        culture,
        medium,
        videos,
        datebegin,
        dateend,
        dated,
        period,
        technique,
        colors,
        primaryimageurl,
        images
    }
}

export const bucketArtByDate = (allArt) => {
    const recompileCollection = (bucketedCollection) => {
        return Object.keys(bucketedCollection).reduce((flatColl, dateKey) => {
            flatColl = flatColl.concat(bucketedCollection[dateKey])
            return flatColl;
        }, [])
    }

    const bucketedCollection = allArt.reduce((bucketedArt, piece) => {
        const date = piece.dateend;
        switch(true) {
            case (date < 1800): 
                if (bucketedArt.toEighteenHundreds.length < 10) {
                    bucketedArt.toEighteenHundreds.push(piece)
                }
                break;
            case (date <= 1850):
                if (bucketedArt.eighteenFiftys.length < 10) {
                    bucketedArt.eighteenFiftys.push(piece)
                }
                break;
            case (date <= 1880):
                if (bucketedArt.eighteenEighty.length < 10) {
                    bucketedArt.eighteenEighty.push(piece)
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

    return recompileCollection(bucketedCollection);
}

