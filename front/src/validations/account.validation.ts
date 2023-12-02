import * as yup from "yup"
import { setLocale } from "yup"

setLocale({
    string: {
        min: ({ path, min }) => ({ key: 'string_too_short', values: { min }, message: min === 1 ? `doit faire ${min} caractère minimum` : `doit faire ${min} caractères minimum`, path }),
        max: ({ path, max }) => ({ key: 'string_too_long', values: { max }, message: `doit faire ${max} caractères maximum`, path }),
        email: ({ path }) => ({ key: "email_invalid", message: "doit être un email valide", path }),
    },
})

export const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .min(5)
        .max(100)
        .required(),
})

export const userNameSchema = yup.object().shape({
    firstname: yup
        .string()
        .min(1)
        .max(50)
        .required(),
    lastname: yup
        .string()
        .min(1)
        .max(50)
        .required(),
})

export const userPasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,255}$/,
            ({ path }) => ({ key: "regex_not_valid", message: "doit être au bon format", path })
        ),
    password: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,255}$/,
            ({ path }) => ({ key: "regex_not_valid", message: "doit être au bon format", path })
        ),
})