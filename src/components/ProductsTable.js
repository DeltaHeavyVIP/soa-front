import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    bufferProduct,
    isDataNeedsToBeUpdatedState,
    pagingState,
    productsState,
    selectedRoutesId,
    showModalFormForUpdate,
    wasValidated
} from "../state/atoms";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import get from 'lodash.get'
import set from "lodash.set";
import {allFields} from "../utils/constants";

export const ProductsTable = () => {

    const products = useRecoilValue(productsState)
    const [paging, setPaging] = useRecoilState(pagingState)
    const setBufferProduct = useSetRecoilState(bufferProduct)
    const setValidated = useSetRecoilState(wasValidated)
    const setShow = useSetRecoilState(showModalFormForUpdate)
    const [selectedIds, setSelectedId] = useRecoilState(selectedRoutesId)
    const setIsDataNeedsToBeUpdated = useSetRecoilState(isDataNeedsToBeUpdatedState)

    const edit = (product) => {
        const updateProd = {
            "id": product["id"],
            "name": product["name"],
            "coordinates": {
                "x": product["coordinates"]["x"],
                "y": product["coordinates"]["y"]
            },
            "price": product["price"],
            "partNumber": product["partNumber"],
            "manufactureCost": product["manufactureCost"],
            "unitOfMeasure": product["unitOfMeasure"],
            "eyeColor": product["owner"]["eyeColor"],
            "hairColor": product["owner"]["hairColor"],
            "nationality": product["owner"]["nationality"],
            "owner": {
                "name": product["owner"]["name"],
                "passport": product["owner"]["passportID"]
            },
            "location": {
                "x": product["owner"]["location"]["x"],
                "y": product["owner"]["location"]["y"],
                "z": product["owner"]["location"]["z"]
            }
        }
        setBufferProduct(updateProd)
        setValidated(false)
        setShow(true)
    }

    const select = (event, routeId) => {
        if (selectedIds.indexOf(routeId) >= 0) {
            setSelectedId(selectedIds.filter((x) => {
                return x !== routeId
            }))
        } else {
            setSelectedId([...selectedIds, routeId])
        }
    }

    return (
        <>
            <table className="table table-dark table-bordered mt-2">
                <thead className="text-center align-middle">
                <tr>
                    <th rowSpan="3">id</th>
                    <th rowSpan="3">name</th>
                    <th colSpan="2">coordinates</th>
                    <th rowSpan="3">creationDate</th>
                    <th rowSpan="3">price</th>
                    <th rowSpan="3">partNumber</th>
                    <th rowSpan="3">manufactureCost</th>
                    <th rowSpan="3">unitOfMeasure</th>
                    <th colSpan="8">owner</th>
                </tr>
                <tr>
                    <th rowSpan="2">x</th>
                    <th rowSpan="2">y</th>
                    <th rowSpan="2">name</th>
                    <th rowSpan="2">passportID</th>
                    <th rowSpan="2">eyeColor</th>
                    <th rowSpan="2">hairColor</th>
                    <th rowSpan="2">nationality</th>
                    <th colSpan="3">location</th>
                </tr>
                <tr>
                    <th>x</th>
                    <th>y</th>
                    <th>z</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id} data-bs-toggle="tooltip" title={JSON.stringify(product, undefined, 4)}
                        className={selectedIds.indexOf(product.id) !== -1 ? 'selected' : ''}
                        onDoubleClick={() => {
                            edit(product)
                        }}
                        onClick={(event) => {
                            select(event, product.id)
                        }}>
                        {allFields.map(field => (
                            <td key={field}>
                                {get(product, field.replaceAll('_', '.'), '')}
                            </td>
                        ))}
                    </tr>
                ))}
                {[...Array(Math.max(get(paging, 'size', 10) - products.length, 0))].map((e, i) =>
                    <tr key={i}>{allFields.map(field => <td key={field}>-</td>)}</tr>
                )}
                </tbody>
            </table>
            <div className="text-center">
                <ButtonGroup>
                    <Button variant="dark" onClick={() => {
                        setPaging(set(Object.assign({}, paging), 'number', Math.max(Number(get(paging, 'number', 1)) - 1, 1)))
                        setIsDataNeedsToBeUpdated(true)
                    }}>&lt;</Button>
                    <ToggleButton variant="dark" value="page">{get(paging, 'number', 1)}</ToggleButton>
                    <Button variant="dark" onClick={() => {
                        setPaging(set(Object.assign({}, paging), 'number', Number(get(paging, 'number', 1)) + 1))
                        setIsDataNeedsToBeUpdated(true)
                    }}>&gt;</Button>
                </ButtonGroup>
            </div>
        </>
    )

}