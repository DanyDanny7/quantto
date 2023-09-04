import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            itemid:  yup.string().required(__(`${module}.inputDetail.itemid.error`)),
            lot: yup.string().required(__(`${module}.inputDetail.lot.error`)),
            lpn: yup.string().required(__(`${module}.inputDetail.lpn.error`)),
            quantity: yup.string().required(__(`${module}.inputDetail.quantity.error`)),
            expirationdate: yup.string().required(__(`${module}.inputDetail.expirationdate.error`)),
            statusid: yup.string().required(__(`${module}.inputDetail.statusid.error`)),
            sourcelocationid: yup.string().required(__(`${module}.inputDetail.sourcelocationid.error`)),
            destinationlocationid: yup.string().required(__(`${module}.inputDetail.destinationlocationid.error`)),
        })
    )
}

export default validators
