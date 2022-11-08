import {Form, InputGroup} from 'react-bootstrap'
import {InputFieldFilter} from "./InputFieldFilter";

export const InputObjectFilter = ({id, fields, type}) => {
    return (
        <>
            <Form.Label htmlFor={id}>{id}</Form.Label>
            <InputGroup className="mb-3" id={id}>
                {fields.map(field => (
                    <InputFieldFilter key={id + '.' + field} id={id + '.' + field} type={type} isEmbedded={true}/>
                ))}
            </InputGroup>
        </>
    )
}