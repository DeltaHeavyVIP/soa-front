import get from 'lodash.get'
import set from 'lodash.set'

export const validate = (product) => {
    const feedback = {}

    if (Number(get(product, 'price', '')) <= 0)
        set(feedback, 'price', 'Price must be greater than 0')

    if (get(product, 'owner.passport', '').length > 40)
        set(feedback, 'owner.passport', 'owner passport must not be longer than 40')

    if (get(product, 'name', '').length <= 0)
        set(feedback, 'name', 'name must not be empty')

    if (get(product, 'owner.name', '').length <= 0)
        set(feedback, 'owner.name', 'owner name must not be empty')

    if (Number(get(product, 'coordinates.x', '')) >= 791)
        set(feedback, 'coordinates.x', 'coordinates x must not be greater than 791')

    const notNullFields = [
        'name', 'coordinates.y', 'price',
        'partNumber', 'manufactureCost',
        'owner.name', 'owner.passport', 'location.y',
        'unitOfMeasure', 'eyeColor', 'hairColor', 'nationality'
    ]

    notNullFields.forEach(field => {
        if (get(product, field, '') === '')
            set(feedback, field, field + ' must not be empty')
    })

    return feedback
}

export const validateFilter = (filter) => {
    const feedback = {}

    if (Number(get(filter, 'price', '')) <= 0)
        set(feedback, 'price', 'Price must be greater than 0')

    if (get(filter, 'owner.passport', '').length > 40)
        set(feedback, 'owner.passport', 'owner passport must not be longer than 40')

    if (get(filter, 'name', '').length <= 0)
        set(feedback, 'name', 'name must not be empty')

    if (get(filter, 'owner.name', '').length <= 0)
        set(feedback, 'owner.name', 'owner name must not be empty')

    if (Number(get(filter, 'coordinates.x', '')) >= 791)
        set(feedback, 'coordinates.x', 'coordinates x must not be greater than 791')

    return feedback
}

export const validatePage = (page) => {
    const feedback = {}

    if (Number(get(page, 'number', '')) <= 0)
        set(feedback, 'number', 'number must be greater than 0')

     if (Number(get(page, 'size', '')) <= 0)
        set(feedback, 'size', 'size must be greater than 0')

    return feedback
}