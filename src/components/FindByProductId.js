import {Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {useRecoilState, useSetRecoilState} from "recoil";
import {isDataNeedsToBeUpdatedState, productsState} from "../state/atoms";
import {findById} from "../utils/apiInteraction";
import toast from "react-hot-toast";
import get from "lodash.get";

export const FindByProductId = () => {

    const [id, setId] = useState(null)
    const setRoutes = useSetRecoilState(productsState)
    const [, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)
    const [, setIsLoading] = useState(true)

    const count = () => {
        if (id === '' || id === 0) {
                setIsDataNeedsToBeUpdated(true)
            return
        }
        setIsLoading(true)
        setIsDataNeedsToBeUpdated(false)
        findById(id).then((response) => {
            setRoutes([response.data])
        }).catch((err) => {
            toast.error(get(err, 'response.data.message', 'Error'))
        }).finally(() => setIsLoading(false))
    }

    return (
        <Form>
            <InputGroup className="mb-3">
                <Button variant="dark" onClick={count}>Find</Button>
                <InputGroup.Text> product by id : </InputGroup.Text>
                <Form.Control type="number" step="any" onChange={event => setId(event.target.value)}/>
            </InputGroup>
        </Form>
    )
}