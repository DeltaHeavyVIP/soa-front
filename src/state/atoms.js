import {atom} from "recoil";

export const wasValidated = atom({
    key: 'wasValidated',
    default: false,
});

export const showModalForm = atom({
    key: 'showModalForm',
    default: false,
});

export const showModalFormForUpdate = atom({
    key: 'showModalFormForUpdate',
    default: false,
});

export const showModalFormForDelete = atom({
    key: 'showModalFormForDelete',
    default: false,
});

export const showModalFormForLowerCost = atom({
    key: 'showModalFormForLowerCost',
    default: false,
});

export const showModalFormForFilter = atom({
    key: 'showModalFormForFilter',
    default: false,
});

export const bufferProduct = atom({
    key: 'bufferProduct',
    default: {
        "coordinates":{
            "x":null
        },
        "location": {
            "x": null,
            "z": null
        }
    },
});

export const feedbackProductValidator = atom({
    key: 'feedbackProductValidator',
    default: {},
});

//App atom

export const isDataNeedsToBeUpdatedState = atom({
    key: "isDataNeedsToBeUpdatedState",
    default: true,
});

export const productsState = atom({
    key: 'productsState',
    default: [],
});

//Table

export const selectedRoutesId = atom({
    key: 'selectedRoutesId',
    default: [],
})

//filter

export const feedbackProductValidatorFilter = atom({
    key: 'feedbackProductValidatorFilter',
    default: {},
});

export const wasValidatedFilter = atom({
    key: 'wasValidatedFilter',
    default: false,
});

export const filtersState = atom({
    key: "filtersState",
    default: {
        "id": null,
        "name": null,
        "coordinates": {
            "x": null,
            "y": null
        },
        "price": null,
        "partNumber": null,
        "manufactureCost": null,
        "unitOfMeasure": null,
        "owner": {
            "name": null,
            "passport": null,
            "eyeColor": null,
            "hairColor": null,
            "nationality": null
        },
        "location": {
            "x": null,
            "y": null,
            "z": null
        }
    },
});

// sorting

export const showModalFormForSort = atom({
    key: 'showModalFormForSort',
    default: false,
});

export const wasValidatedSort = atom({
    key: 'wasValidatedSort',
    default: false,
});

export const pagingState = atom({
    key: 'pagingState',
    default: {
        "number": 1,
        "size": 10
    },
})

export const sortState = atom({
    key: 'sortState',
    default: [],
})

export const feedbackProductValidatorSort = atom({
    key: 'feedbackProductValidatorSort',
    default: {},
});