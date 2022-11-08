import set from "lodash.set";
import {validate} from "../utils/productValidator";
import {useRecoilState, useRecoilValue} from "recoil";
import {bufferProduct, feedbackProductValidator, wasValidated} from "../state/atoms";
import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import get from "lodash.get";

export const EnumForm = ({field, id}) => {

    const [product, setProduct] = useRecoilState(bufferProduct)
    const [feedback, setFeedback] = useRecoilState(feedbackProductValidator)
    const validated = useRecoilValue(wasValidated)

    const changeEnum = () => {
        const newProduct = JSON.parse(JSON.stringify(product))
        set(newProduct, id, document.getElementById(id).value)
        setProduct(newProduct)
        setFeedback(validate(newProduct))
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>{id}</Form.Label>
            <OverlayTrigger placement="bottom"
                            overlay={
                                <Tooltip id={'tooltip' + id}>
                                    {validated ? get(feedback, id, '') : ''}
                                </Tooltip>}>
                <Form.Select id={id} value={get(product, id, field[0])} onChange={changeEnum}>
                    {field.map(field => [field]).flat().map(x => <option key={x}>{x}</option>)}
                </Form.Select>
            </OverlayTrigger>
        </Form.Group>
    )

}