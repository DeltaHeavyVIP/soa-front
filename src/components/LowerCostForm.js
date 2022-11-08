import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    bufferProduct,
    feedbackProductValidator,
    isDataNeedsToBeUpdatedState,
    showModalFormForLowerCost,
    wasValidated
} from "../state/atoms";
import toast from "react-hot-toast";
import {lowerCostProducts} from "../utils/apiInteraction";
import get from "lodash.get";
import set from "lodash.set";
import {InputField} from "./InputField";

export const LowerCostForm = () => {

    const setFeedback = useSetRecoilState(feedbackProductValidator)
    const [showDelete, setShowDelete] = useRecoilState(showModalFormForLowerCost);
    const [product,] = useRecoilState(bufferProduct)
    const setValidated = useSetRecoilState(wasValidated)
    const setIsDataNeedsToBeUpdated = useSetRecoilState(isDataNeedsToBeUpdatedState)


    const handleShow = () => {
        setShowDelete(true)
        setFeedback({})
    }

    const lowerCost = () => {
        if (Number(get(product, 'percent')) <= 0 || Number(get(product, 'percent')) > 100) {
            const feedback = {}
            set(feedback, 'percent', 'Percent must be over 0 and lower 100')
            setFeedback(feedback)
            setValidated(true)
        } else {
            toast.promise(lowerCostProducts(Number(get(product, 'percent'))), {
                loading: 'Expect...',
                success: 'Success',
                error: (err) => get(err, 'response.data.message', 'Error'),
            }).then(() => {
                setIsDataNeedsToBeUpdated(true)
                setShowDelete(false)
                setValidated(false)
                setFeedback({})
            })
        }
    }

    return (
        <>
            <Button variant="dark me-2" onClick={handleShow}>Lower Cost</Button>
            <Modal show={showDelete} onHide={() => setShowDelete(false)} contentClassName="bg-dark text-light">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>Lower Cost Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField id="percent" type="number"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary text-light"
                            onClick={lowerCost}> Lower Cost </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}