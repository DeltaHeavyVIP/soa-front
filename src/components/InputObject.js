import {Form, InputGroup} from 'react-bootstrap'
import {InputField} from './InputField'

export const InputObject = ({id, fields, type}) => {
    return (
        <>
            <Form.Label htmlFor={id}>{id}</Form.Label>
            <InputGroup className="mb-3" id={id}>
                {fields.map(field => (
                    <InputField key={id + '.' + field} id={id + '.' + field} type={type} isEmbedded={true}/>
                ))}
            </InputGroup>
        </>
    )
}