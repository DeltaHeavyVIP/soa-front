import axios from 'axios'

const SERVICE_1 = 'https://localhost:10102/api/v1'
const SERVICE_2 = 'https://localhost:10110/api/v1/ebay'

export const countProductByPrice = (price) => {
    return axios.get(SERVICE_1 + '/count/products/price_high_parameter?price=' + price)
}

export const getUniqueName = () => {
    return axios.get(SERVICE_1 + '/search/products/name/unique')
}

export const findById = (id) => {
    return axios.get(SERVICE_1 + '/products/' + id)
}

export const findBySubstringName = (substring) => {
    return axios.get(SERVICE_1 + '/search/products/name/include/substring?subString=' + substring)
}

export const findByOwnerId = (ownerId) => {
    return axios.get(SERVICE_2 + '/filter/manufacturer/' + ownerId)
}

export const createProduct = (product) => {
    const resp = JSON.stringify(getProduct(product))
    return axios.post(SERVICE_1 + '/products', resp, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*'
        }
    })
}

const getProduct = (product) => {
    return {
        'name': product["name"],
        'coordinates': {
            'x': product["coordinates"]["x"], 'y': product["coordinates"]["y"]
        },
        'price': product["price"],
        'partNumber': product["partNumber"],
        'manufactureCost': product["manufactureCost"],
        'unitOfMeasure': product["unitOfMeasure"],
        'owner': {
            'name': product["owner"]["name"],
            'passportID': product["owner"]["passport"],
            'eyeColor': product["eyeColor"],
            'hairColor': product["hairColor"],
            'nationality': product["nationality"],
            'location': {
                'x': product["location"]["x"], 'y': product["location"]["y"], 'z': product["location"]["z"],
            }
        }
    }
}

export const updateProductLink = (product) => {
    const resp = JSON.stringify(getProduct(product))
    return axios.put(SERVICE_1 + '/products/' + product.id, resp, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*'
        }
    })
}

export const deleteProductById = (productId) => {
    return axios.delete(SERVICE_1 + '/products/' + productId)
}

export const lowerCostProducts = (percent) => {
    return axios.put(SERVICE_2 + "/price/decrease/" + percent.toString(),{})
}

export const getProducts = (filters, sorting, paging) => {
    const resp = JSON.stringify(paramToObject(filters, sorting, paging))
    return axios.post(SERVICE_1 + '/products/filter', resp, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*'
        }
    })
}

export const paramToObject = (filters, sorting, paging) => {
    const arrayResp = sortToArray(sorting)
    return {
        "page": paging["number"],
        "pageSize": paging["size"],
        "id": filters["id"],
        "name": filters["name"],
        "coordinateX": filters["coordinates"]["x"],
        "coordinateY": filters["coordinates"]["y"],
        "price": filters["price"],
        "partNumber": filters["partNumber"],
        "manufactureCost": filters["manufactureCost"],
        "unitOfMeasure": filters["unitOfMeasure"],
        "ownerName": filters["owner"]["name"],
        "ownerPassportId": filters["owner"]["passport"],
        "ownerEyeColor": filters["owner"]["eyeColor"],
        "ownerHairColor": filters["owner"]["hairColor"],
        "ownerNationality": filters["owner"]["nationality"],
        "ownerLocationX": filters["location"]["x"],
        "ownerLocationY": filters["location"]["y"],
        "ownerLocationZ": filters["location"]["z"],
        "orderBy": arrayResp
    }
}

const sortToArray = (sort) => {
    const ret = {}
    sort.map(field => {
        if (field[0] === "+") {
            ret[field.toString().substring(1)] = "asc"
        } else if (field[0] === "-") {
            ret[field.toString().substring(1)] = "desc"
        }
    })
    return ret
}