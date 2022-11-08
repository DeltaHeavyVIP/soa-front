import {useRecoilState, useSetRecoilState} from "recoil";
import {
    bufferProduct,
    feedbackProductValidator,
    isDataNeedsToBeUpdatedState,
    showModalFormForUpdate,
    wasValidated
} from "../state/atoms";
import {validate} from "../utils/productValidator";
import toast from "react-hot-toast";
import get from "lodash.get";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {ProductForm} from "./ProductForm";
import set from "lodash.set";
import {updateProductLink} from "../utils/apiInteraction";
import {InputField} from "./InputField";

export const UpdateForm = () => {

    const [showUpdate, setShowUpdate] = useRecoilState(showModalFormForUpdate);
    const setValidated = useSetRecoilState(wasValidated)
    const [product, setProduct] = useRecoilState(bufferProduct)
    const setFeedback = useSetRecoilState(feedbackProductValidator)
    const setIsDataNeedsToBeUpdated = useSetRecoilState(isDataNeedsToBeUpdatedState)

    const handleShow = () => {
        setValidated(false)
        setShowUpdate(true)
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

    const updateProduct = () => {
        const freshFeedback = validate(product)
        if (Number(get(product, 'id')) <= 0) {
            set(freshFeedback, 'id', 'Product id must be over 0')
        }
        setFeedback(freshFeedback)
        if (Object.keys(freshFeedback).length === 0) {
            toast.promise(updateProductLink(product), {
                loading: 'Trying to update...',
                success: "Success",
                error: (err) => get(err, 'response.data.message', 'Error'),
            }).then(() => {
                setIsDataNeedsToBeUpdated(true)
                setShowUpdate(false)
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
            <Button variant="dark me-2" onClick={handleShow}>Update</Button>
            <Modal show={showUpdate} onHide={() => setShowUpdate(false)} contentClassName="bg-dark text-light">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Update Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField id="id" type="number"/>
                    <ProductForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary text-light"
                            onClick={clear}>Clear</Button>
                    <Button variant="outline-secondary text-light"
                            onClick={updateProduct}> Update product </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}