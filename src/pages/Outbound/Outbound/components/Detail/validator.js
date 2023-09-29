import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            itemid:  yup.string().required(__(`${module}.input.itemid.error`)),
            quantity: yup.string().required(__(`${module}.input.quantity.error`)),
        })
    )
}

export default validators
