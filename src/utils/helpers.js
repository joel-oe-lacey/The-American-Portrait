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