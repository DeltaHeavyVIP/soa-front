import {Form} from 'react-bootstrap'
import {InputField} from './InputField'
import {
    fieldColorWithEmptyElement,
    fieldCountryWithEmptyElement,
    fieldUnitOfMeasureWithEmptyElement
} from "../utils/constants";
import {InputObject} from "./InputObject";
import {EnumForm} from "./EnumForm";

export const ProductForm = () => {

    return (
        <Form>
            <InputField id="name" type="text"/>
            <InputObject id="coordinates" fields={['x', 'y']} type="number"/>

            <InputField id="price" type="number"/>
            <InputField id="partNumber" type="text"/>
            <InputField id="manufactureCost" type="number"/>

            <EnumForm field={fieldUnitOfMeasureWithEmptyElement} id={"unitOfMeasure"}/>

            <InputField id="owner.name" type="text"/>
            <InputField id="owner.passport" type="text"/>

            <EnumForm field={fieldColorWithEmptyElement} id={"eyeColor"}/>
            <EnumForm field={fieldColorWithEmptyElement} id={"hairColor"}/>
            <EnumForm field={fieldCountryWithEmptyElement} id={"nationality"}/>

            <InputObject id="location" fields={['x', 'y', 'z']} type="number"/>

        </Form>
    )
}