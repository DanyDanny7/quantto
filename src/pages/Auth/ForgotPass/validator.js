import * as yup from 'yup';
import { get } from "lodash";

const validators = (inputs) => (value) => {
    return (
        yup.object({
            email: yup.string().email(get(inputs, "[0].error-2")).required(get(inputs, "[0].error")),
        })
    )
}

export default validators
