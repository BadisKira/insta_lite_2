import * as yup from "yup"
import { IDisplayedError, IYupError } from "../types/validation.type"

const checkValidationErrors = (
	errors: IYupError[],
	displayedErrors: IDisplayedError[]
) => {
	displayedErrors.forEach((element) => {
		const foundError = errors.find((error) => error.path === element.path)
		
		element.setError({
			isError: foundError !== undefined,
			message: foundError ? foundError.message : "",
		})
	})
}

export const validation = async (
	payload: object,
	schema: yup.Schema<unknown>,
	displayedErrors: IDisplayedError[]
) => {
	try {
		await schema.validate(payload, { abortEarly: false })
		return true
	} catch (error) {
        if (error && typeof error === "object" && "errors" in error) {
            console.log("Error paths : ", (error.errors as IYupError[]).map((err) => err.path))
            checkValidationErrors(error.errors as IYupError[], displayedErrors)
        }
        
        console.error({ error }) 
		return false
	}
}

export default validation