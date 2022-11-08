import {Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {getUniqueName} from '../utils/apiInteraction'
import toast from 'react-hot-toast'
import get from 'lodash.get'

export const UniqueName = () => {

    const seach = () => {
        toast.promise(getUniqueName(), {
            loading: 'Search...',
            success: "Success",
            error: (err) => get(err, 'response.data.message', 'Error'),
        }).then((response) => {
            document.getElementById("uniqueOutput").value = response.data
        })
    }

    return (
        <Form>
            <InputGroup className="mb-3">
                <Button variant="dark" onClick={seach}>Get</Button>
                <InputGroup.Text> products name where name is unique </InputGroup.Text>
                <Form.Control id="uniqueOutput" type="text" readOnly/>
            </InputGroup>
        </Form>
    )
}