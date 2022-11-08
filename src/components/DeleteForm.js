import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    bufferProduct,
    feedbackProductValidator,
    isDataNeedsToBeUpdatedState,
    showModalFormForDelete,
    wasValidated
} from "../state/atoms";
import toast from "react-hot-toast";
import {deleteProductById} from "../utils/apiInteraction";
import get from "lodash.get";
import set from "lodash.set";
import {InputField} from "./InputField";

export const DeleteForm = () => {

    const setFeedback = useSetRecoilState(feedbackProductValidator)
    const [showDelete, setShowDelete] = useRecoilState(showModalFormForDelete);
    const [product, setProduct] = useRecoilState(bufferProduct)
    const setValidated = useSetRecoilState(wasValidated)
    const setIsDataNeedsToBeUpdated = useSetRecoilState(isDataNeedsToBeUpdatedState)


    const handleShow = () => {
        setShowDelete(true)
        setFeedback({})
    }

    const deleteProduct = () => {
        if (Number(get(product, 'id')) <= 0) {
            const feedback = {}
            set(feedback, 'id', 'Product id must be over 0')
            setFeedback(feedback)
            setValidated(true)
        } else {
            toast.promise(deleteProductById(Number(get(product, 'id'))), {
                loading: 'Delete...',
                success: "Success",
                error: (err) => get(err, 'response.data.message', 'Error'),
            }).then(() => {
                setIsDataNeedsToBeUpdated(true)
                setShowDelete(false)
                setValidated(false)
                setFeedback({})
                setProduct({})
            })
        }
    }

    return (
        <>
            <Button variant="dark me-2" onClick={handleShow}>Delete</Button>
            <Modal show={showDelete} onHide={() => setShowDelete(false)} contentClassName="bg-dark text-light">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Delete Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField id="id" type="number"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary text-light"
                            onClick={deleteProduct}> Delete product </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}