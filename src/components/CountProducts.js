import {Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {countProductByPrice} from '../utils/apiInteraction'
import toast from 'react-hot-toast'
import get from 'lodash.get'

export const CountProducts = () => {
    const [price, setPrice] = useState(0)

    const count = () => {
        toast.promise(countProductByPrice(price), {
            loading: 'Search...',
            success: "Success",
            error: (err) => get(err, 'response.data.message', 'Error'),
        }).then((response) => {
            document.getElementById("countProductWherePriceOver").value = response.data["amount"]
        })
    }

    return (
        <Form>
            <InputGroup className="mb-3">
                <Button variant="dark" onClick={count} disabled={price.toString() === '' || price === 0}>Count </Button>
                <InputGroup.Text> products where price over </InputGroup.Text>
                <Form.Control type="number" step="any" onChange={event => setPrice(event.target.value)}/>
                <Form.Control id="countProductWherePriceOver" type="text" readOnly/>
            </InputGroup>
        </Form>
    )
}