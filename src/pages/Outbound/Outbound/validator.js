import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            description: yup.string().required(__(`${module}.input.description.error`)),
            type: yup.string().required(__(`${module}.input.type.error`)),
        })
    )
}

export default validators
