import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            itemid:  yup.string().required(__(`${module}.inputDetail.itemid.error`)),
            uomid:  yup.string().required(__(`${module}.inputDetail.uomid.error`)),
            // lot: yup.string().required(__(`${module}.inputDetail.lot.error`)),
            quantity: yup.string().required(__(`${module}.inputDetail.quantity.error`)),
            statusid: yup.string().required(__(`${module}.inputDetail.statusid.error`)),
            // locationid: yup.string().required(__(`${module}.inputDetail.locationid.error`)),
        })
    )
}

export default validators
