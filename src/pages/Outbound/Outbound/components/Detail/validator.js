import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            itemid:  yup.string().required(__(`${module}.input.itemid.error`)),
            // lot: yup.string().required(__(`${module}.input.lot.error`)),
            quantity: yup.string().required(__(`${module}.input.quantity.error`)),
            // statusid: yup.string().required(__(`${module}.input.statusid.error`)),
            // locationid: yup.string().required(__(`${module}.input.locationid.error`)),
        })
    )
}

export default validators
