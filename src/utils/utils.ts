import { ZodSchema } from 'zod';

export type ValidationResult<T> = {
	success?: boolean;
	data: T;
	errors?: any;
};

const transformFormDataToObject = (formData: FormData): Record<string, any> => {
	const obj: Record<string, any> = {};
	// for (const [key, value] of formData.entries()) {
	// 	(obj as any)[key] = value;
	// }
	formData.forEach((value, key) => {
		(obj as any)[key] = value;
	});
	return obj;
};

export const validateForm = <T>(
	formData: FormData,
	schema: ZodSchema<T>,
): ValidationResult<T> => {
	const obj = transformFormDataToObject(formData) as T;
	const result = schema.safeParse(obj);

	if (!result.success)
		return {
			success: result.success,
			errors: result.error.flatten().fieldErrors,
			data: obj,
		};
	else
		return {
			success: result.success,
			data: result.data,
		};
};
