import {Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {findByOwnerId} from '../utils/apiInteraction'
import toast from 'react-hot-toast'
import get from 'lodash.get'
import {useRecoilState, useSetRecoilState} from "recoil";
import {isDataNeedsToBeUpdatedState, productsState} from "../state/atoms";

export const FindByOwnerId = () => {
    const [ownerId, setOwnerId] = useState('')
    const setRoutes = useSetRecoilState(productsState)
    const [, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)
    const [, setIsLoading] = useState(true)

    const count = () => {
        if (ownerId === '') {
            setIsDataNeedsToBeUpdated(true)
            return
        }
        setIsLoading(true)
        setIsDataNeedsToBeUpdated(false)
        findByOwnerId(ownerId).then((response) => {
            setRoutes(response.data)
        }).catch((err) => {
            toast.error(get(err, 'response.data.message', 'Error'))
        }).finally(() => setIsLoading(false))
    }

    return (
        <Form>
            <InputGroup className="mb-3">
                <Button variant="dark" onClick={count}>Find </Button>
                <InputGroup.Text> products where owner id is </InputGroup.Text>
                <Form.Control type="text" step="any" onChange={event => setOwnerId(event.target.value)}/>
            </InputGroup>
        </Form>
    )
}