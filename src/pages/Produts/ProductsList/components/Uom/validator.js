import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            barcode: yup.string().max(100, __(`${module}.inputUom.barcode.error2`)).required(__(`${module}.inputUom.barcode.error1`)),
            factor: yup.string().required(__(`${module}.inputUom.factor.error`)),
            uomId: yup.string().required(__(`${module}.inputUom.uomId.error`)),
        })
    )
}

export default validators
