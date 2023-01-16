import * as yup from 'yup';
import { get } from "lodash";

const validators = (inputs) => (value) => {
    return (
        yup.object({
            name: yup.string().required(get(inputs, "[0].error")),
            company: yup.string().required(get(inputs, "[1].error")),
            email: yup.string().email(get(inputs, "[2].error-2")).required(get(inputs, "[2].error")),
            password: yup.string()
                // .matches(/^(?=.*[a-z])/, 'Ingrese al menos 1 minuscula')
                // .matches(/^(?=.*[A-Z])/, 'Ingrese al menos 1 mayúscula')
                // .matches(/^(?=.*[0-9])/, 'Ingrese al menos 1 número')
                // .matches(/^(?=.*\W)/, 'Ingrese al menos 1 caracter especial')
                // .min(8, 'Ingrese al menos 8 caracteres')
                .required(get(inputs, "[3].error"))
                .oneOf([yup.ref('confirmation'), null], get(inputs, "[3].error-2")),
            confirmation: yup.string()
                // .matches(/^(?=.*[a-z])/, 'Ingrese al menos 1 minuscula')
                // .matches(/^(?=.*[A-Z])/, 'Ingrese al menos 1 mayúscula')
                // .matches(/^(?=.*[0-9])/, 'Ingrese al menos 1 número')
                // .required('La confirmación de contraseña es requerida')
                .oneOf([yup.ref('password'), null], get(inputs, "[4].error-2"))
        })
    )
}

export default validators
