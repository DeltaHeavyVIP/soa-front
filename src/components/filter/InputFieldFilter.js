import {Form, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'
import get from 'lodash.get'
import {useRecoilState, useRecoilValue} from 'recoil'
import set from 'lodash.set'
import {feedbackProductValidatorFilter, filtersState, wasValidatedFilter} from "../../state/atoms";

export const InputFieldFilter = ({id, isEmbedded = false, type, step = 'any'}) => {

    const [filters, setFilters] = useRecoilState(filtersState)
    const [feedback,] = useRecoilState(feedbackProductValidatorFilter)
    const validated = useRecoilValue(wasValidatedFilter)

    const change = (event) => {
        const newFilter = JSON.parse(JSON.stringify(filters))
        set(newFilter, event.target.id, event.target.value)
        setFilters(newFilter)
    }

    return isEmbedded ? (
        <>
            <InputGroup.Text id={id}>{id.split('.').pop()}</InputGroup.Text>
            <OverlayTrigger placement="bottom"
                            overlay={
                                <Tooltip id={'tooltip' + id}>
                                    {validated ? get(feedback, id, '') : ''}
                                </Tooltip>}>
                <Form.Control id={id} value={get(filters, id, '')}
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
                <Form.Control id={id} value={get(filters, id, '')}
                              type={type} step={step} onChange={change}
                              isInvalid={get(feedback, id, '') !== '' && validated}
                              isValid={get(feedback, id, '') === '' && validated}/>
            </Form.Group>
        </OverlayTrigger>
    )
}