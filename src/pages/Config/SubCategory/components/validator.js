import * as yup from 'yup';

const validators = (__, module) => (value) => {
    return (
        yup.object({
            description: yup.string().max(100, __(`${module}.input.description.error2`)).required(__(`${module}.input.description.error1`)),
        })
    )
}

export default validators
