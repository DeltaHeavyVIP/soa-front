import {filtersState, isDataNeedsToBeUpdatedState, showModalFormForFilter} from "../../state/atoms";
import Button from "react-bootstrap/Button";
import {useRecoilState} from "recoil";
import set from "lodash.set";
import {Form, Modal} from "react-bootstrap";
import get from "lodash.get";
import {
    fieldColorWithEmptyElement,
    fieldCountryWithEmptyElement,
    fieldUnitOfMeasureWithEmptyElement
} from "../../utils/constants";
import {InputFieldFilter} from "./InputFieldFilter";
import {InputObjectFilter} from "./InputObjectFilter";

export const FiltersForm = () => {

    const [show, setShow] = useRecoilState(showModalFormForFilter);
    const [filters, setFilters] = useRecoilState(filtersState)
    const [, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)

    const handleShow = () => {
        setShow(true)
    }

    const clear = () => {
        setFilters({
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
        })
    }
    const apply = () => {
        setFilters(filters)
        setIsDataNeedsToBeUpdated(true)
        setShow(false)
    }

    return (
        <>
            <Button variant="dark me-2" onClick={handleShow}>Set up Filters</Button>
            <Modal show={show} onHide={() => setShow(false)} contentClassName="bg-dark text-light">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputFieldFilter id="id" type="text"/>
                        <InputFieldFilter id="name" type="text"/>
                        <InputObjectFilter id="coordinates" fields={['x', 'y']} type="number"/>
                        <InputFieldFilter id="price" type="number"/>
                        <InputFieldFilter id="partNumber" type="text"/>
                        <InputFieldFilter id="manufactureCost" type="number"/>

                        <Form.Group className="mb-3">
                            <Form.Label>unitOfMeasure</Form.Label>
                            <Form.Select id="unitOfMeasure"
                                         value={get(filters, "unitOfMeasure", fieldUnitOfMeasureWithEmptyElement[0])}
                                         onChange={() => {
                                             const newFilters = JSON.parse(JSON.stringify(filters))
                                             set(newFilters, "unitOfMeasure", document.getElementById("unitOfMeasure").value)
                                             setFilters(newFilters)
                                         }}>
                                {fieldUnitOfMeasureWithEmptyElement.map(field => [field]).flat().map(x => <option
                                    key={x}>{x}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <InputFieldFilter id="owner.name" type="text"/>
                        <InputFieldFilter id="owner.passport" type="text"/>

                        <Form.Group className="mb-3">
                            <Form.Label>eyeColor</Form.Label>
                            <Form.Select id="owner.eyeColor"
                                         value={get(filters, "owner.eyeColor", fieldColorWithEmptyElement[0])}
                                         onChange={() => {
                                             const newFilters = JSON.parse(JSON.stringify(filters))
                                             set(newFilters, "owner.eyeColor", document.getElementById("owner.eyeColor").value)
                                             setFilters(newFilters)
                                         }}>
                                {fieldColorWithEmptyElement.map(field => [field]).flat().map(x => <option
                                    key={x}>{x}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>hairColor</Form.Label>
                            <Form.Select id="owner.hairColor"
                                         value={get(filters, "owner.hairColor", fieldColorWithEmptyElement[0])}
                                         onChange={() => {
                                             const newFilters = JSON.parse(JSON.stringify(filters))
                                             set(newFilters, "owner.hairColor", document.getElementById("owner.hairColor").value)
                                             setFilters(newFilters)
                                         }}>
                                {fieldColorWithEmptyElement.map(field => [field]).flat().map(x => <option
                                    key={x}>{x}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>nationality</Form.Label>
                            <Form.Select id="owner.nationality"
                                         value={get(filters, "owner.nationality", fieldCountryWithEmptyElement[0])}
                                         onChange={() => {
                                             const newFilters = JSON.parse(JSON.stringify(filters))
                                             set(newFilters, "owner.nationality", document.getElementById("owner.nationality").value)
                                             setFilters(newFilters)
                                         }}>
                                {fieldCountryWithEmptyElement.map(field => [field]).flat().map(x => <option
                                    key={x}>{x}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <InputObjectFilter id="location" fields={['x', 'y', 'z']} type="number"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary text-light"
                            onClick={clear}>Clear</Button>
                    <Button variant="outline-secondary text-light"
                            onClick={apply}>Apply filters</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}