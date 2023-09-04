import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            itemCode: yup.string().required(__(`${module}.input.itemCode.error`)),
            cost: yup.string().required(__(`${module}.input.cost.error`)),
            reorderPoint: yup.string().required(__(`${module}.input.reorderPoint.error`)),
            itemName: yup.string().required(__(`${module}.input.itemName.error`)),
            category: yup.string().required(__(`${module}.input.category.error`)),
            subCategory: yup.string().required(__(`${module}.input.subCategory.error`)),
        })
    )
}

export default validators
