import {Form, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {findBySubstringName} from '../utils/apiInteraction'
import toast from 'react-hot-toast'
import get from 'lodash.get'
import {useRecoilState, useSetRecoilState} from "recoil";
import {isDataNeedsToBeUpdatedState, productsState} from "../state/atoms";

export const FindBySubstringName = () => {
    const [substring, setSubstring] = useState('')
    const setRoutes = useSetRecoilState(productsState)
    const [, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)
    const [, setIsLoading] = useState(true)

    const count = () => {
        if (substring === '' || substring === 0) {
            setIsDataNeedsToBeUpdated(true)
            return
        }
        setIsLoading(true)
        setIsDataNeedsToBeUpdated(false)
        findBySubstringName(substring).then((response) => {
            setRoutes(response.data)
        }).catch((err) => {
            toast.error(get(err, 'response.data.message', 'Error'))
        }).finally(() => setIsLoading(false))
    }


    return (
        <Form>
            <InputGroup className="mb-3">
                <Button variant="dark" onClick={count}>Find </Button>
                <InputGroup.Text> products by name include substring </InputGroup.Text>
                <Form.Control type="text" onChange={event => setSubstring(event.target.value)}/>
            </InputGroup>
        </Form>
    )
}