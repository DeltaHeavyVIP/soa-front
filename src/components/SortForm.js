import Button from "react-bootstrap/Button";
import {DropdownButton, Form, InputGroup, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {
    feedbackProductValidatorSort,
    isDataNeedsToBeUpdatedState,
    pagingState,
    showModalFormForSort,
    sortState,
    wasValidatedSort
} from "../state/atoms";
import {validatePage} from "../utils/productValidator";
import get from "lodash.get";
import set from "lodash.set";
import {allFields} from "../utils/constants";
import {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'

export const SortForm = () => {
    const [show, setShow] = useRecoilState(showModalFormForSort);
    const [, setSortGlobal] = useRecoilState(sortState)
    const [sort, setSort] = useState([])
    const [page, setPage] = useRecoilState(pagingState)
    const [, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)
    const [validated, setValidated] = useRecoilState(wasValidatedSort)
    const [feedback, setFeedback] = useRecoilState(feedbackProductValidatorSort)
    const [fields, setFields] = useState(new Map(allFields.map(x => [x, false])))

    const handleShow = () => {
        setShow(true)
        setValidated(false)
        setFeedback({})
    }

    const clear = () => {
        setSortGlobal([])
        setSort([])
        setPage({
            "number": 1,
            "size": 10
        })
        setValidated(false)
        setFeedback({})
    }

    //todo не работает информирование о плохом вводе
    const apply = () => {
        const freshFeedback = validatePage(page)
        setFeedback(freshFeedback)
        if (Object.keys(freshFeedback).length === 0) {
            setPage(page)
            setSortGlobal(sort)
            setIsDataNeedsToBeUpdated(true)
            setShow(false)
            setFeedback({})
            setValidated(false)
        } else setValidated(true)
    }

    const changePageState = (event) => {
        const newPage = JSON.parse(JSON.stringify(page))
        set(newPage, event.target.id, event.target.value)
        setPage(newPage)
        setFeedback(validatePage(newPage))
    }

    const add = (event) => {
        setSortGlobal([])
        const newFields = Object.assign(fields)
        newFields.set(event.target.innerText.slice(1), true)
        setFields(newFields)
        setSort([...sort, event.target.innerText])
    }

    const pop = () => {
        setSortGlobal([])
        const newFields = Object.assign(fields)
        newFields.set(sort[sort.length - 1].slice(1), false)
        setFields(newFields)
        setSort(sort.slice(0, -1))
    }

    return (<>
        <Button variant="dark me-2" onClick={handleShow}>Page and Sort</Button>
        <Modal show={show} onHide={() => setShow(false)} contentClassName="bg-dark text-light">
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label htmlFor="page">table</Form.Label>
                    <InputGroup className="mb-3" id="page">
                        <InputGroup.Text id="number">number list</InputGroup.Text>
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={'tooltipnumber'}>
                                            {validated ? get(feedback, "number", '') : ''}
                                        </Tooltip>}>
                            <Form.Control id="number" value={get(page, "number", 1)}
                                          type="number" step="any" onChange={changePageState}
                                          isInvalid={get(feedback, "number", '') !== '' && validated}
                                          isValid={get(feedback, "number", '') === '' && validated}/>
                        </OverlayTrigger>
                        <InputGroup.Text id="size">size</InputGroup.Text>
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={'tooltipsize'}>
                                            {validated ? get(feedback, "size", '') : ''}
                                        </Tooltip>}>
                            <Form.Control id="size" value={get(page, "size", 10)}
                                          type="number" step="any" onChange={changePageState}
                                          isInvalid={get(feedback, "size", '') !== '' && validated}
                                          isValid={get(feedback, "size", '') === '' && validated}/>
                        </OverlayTrigger>
                    </InputGroup>
                </Form>

                <Form id="sortForm" className="mx-auto">
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={sort.length ? 'bg-warning' : ''}>
                            {sort.join()}
                        </InputGroup.Text>
                        <DropdownButton variant="dark" title="+">
                            {[...fields].map(value => (
                                <div key={value[0]}>
                                    {!value[1] && <>
                                        <Dropdown.Item onClick={add}>{'+' + value[0]}</Dropdown.Item>
                                        <Dropdown.Item onClick={add}>{'-' + value[0]}</Dropdown.Item>
                                    </>}
                                </div>
                            ))}
                        </DropdownButton>
                        <Button variant="dark" onClick={pop}>-</Button>
                    </InputGroup>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary text-light"
                        onClick={clear}>Clear</Button>
                <Button variant="outline-secondary text-light"
                        onClick={apply}>Apply</Button>
            </Modal.Footer>
        </Modal>
    </>)
}