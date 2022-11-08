import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    bufferProduct,
    feedbackProductValidator,
    isDataNeedsToBeUpdatedState,
    showModalForm,
    wasValidated
} from "../state/atoms";
import toast from "react-hot-toast";
import {createProduct} from "../utils/apiInteraction";
import get from 'lodash.get'
import {ProductForm} from "./ProductForm";
import {validate} from "../utils/productValidator";


export const AddForm = () => {

    const [show, setShow] = useRecoilState(showModalForm);
    const setValidated = useSetRecoilState(wasValidated)
    const [product, setProduct] = useRecoilState(bufferProduct)
    const setFeedback = useSetRecoilState(feedbackProductValidator)
    const setIsDataNeedsToBeUpdated = useSetRecoilState(isDataNeedsToBeUpdatedState)

    const handleShow = () => {
        setValidated(false)
        setShow(true)
        setFeedback({})
    }

    const clear = () => {
        setProduct({
            "coordinates": {
                "x": null
            },
            "location": {
                "x": null,
                "z": null
            }
        })
        setValidated(false)
        setFeedback({})
    }

    const addProduct = () => {
        const freshFeedback = validate(product)
        setFeedback(freshFeedback)
        if (Object.keys(freshFeedback).length === 0) {
            toast.promise(createProduct(product), {
                loading: 'Trying to add...',
                success: "Success",
                error: (err) => get(err, 'response.data.message', 'Error'),
            }).then(() => {
                setIsDataNeedsToBeUpdated(true)
                setShow(false)
                setValidated(false)
                setFeedback({})
                setProduct({
                    "coordinates": {
                        "x": null
                    },
                    "location": {
                        "x": null,
                        "z": null
                    }
                })
            })
        } else setValidated(true)
    }

    return (
        <>
            <Button variant="dark me-2" onClick={handleShow}>Add</Button>
            <Modal show={show} onHide={() => setShow(false)} contentClassName="bg-dark text-light">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Add Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary text-light"
                            onClick={clear}>Clear</Button>
                    <Button variant="outline-secondary text-light"
                            onClick={addProduct}> Add product </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}