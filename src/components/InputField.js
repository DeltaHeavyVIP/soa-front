import {Form, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'
import get from 'lodash.get'
import {useRecoilState, useRecoilValue} from 'recoil'
import {bufferProduct, feedbackProductValidator, wasValidated} from '../state/atoms'
import set from 'lodash.set'
import {validate} from '../utils/productValidator'

export const InputField = ({id, isEmbedded = false, type, step = 'any'}) => {

    const [product, setProduct] = useRecoilState(bufferProduct)
    const [feedback, setFeedback] = useRecoilState(feedbackProductValidator)
    const validated = useRecoilValue(wasValidated)

    const change = (event) => {
        const newProduct = JSON.parse(JSON.stringify(product))
        set(newProduct, event.target.id, event.target.value)
        setProduct(newProduct)
        setFeedback(validate(newProduct))
    }

    return isEmbedded ? (
        <>
            <InputGroup.Text id={id}>{id.split('.').pop()}</InputGroup.Text>
            <OverlayTrigger placement="bottom"
                            overlay={
                                <Tooltip id={'tooltip' + id}>
                                    {validated ? get(feedback, id, '') : ''}
                                </Tooltip>}>
                <Form.Control id={id} value={get(product, id, '')}
                              type={type} step={step} onChange={change}
                              isInvalid={get(feedback, id, '') !== '' && validated}
                              isValid={get(feedback, id, '') === '' && validated}/>
            </OverlayTrigger>
        </>
    ) : (
        <OverlayTrigger placement="bottom"
                        overlay={
                            <Tooltip id={'tooltip' + id}>
                                {validated ? get(feedback, id, '') : ''}
                            </Tooltip>}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor={id}>{id}</Form.Label>
                <Form.Control id={id} value={get(product, id, '')}
                              type={type} step={step} onChange={change}
                              isInvalid={get(feedback, id, '') !== '' && validated}
                              isValid={get(feedback, id, '') === '' && validated}/>
            </Form.Group>
        </OverlayTrigger>
    )
}