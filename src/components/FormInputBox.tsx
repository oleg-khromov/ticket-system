import React from 'react';
import { Input, Label, TextError } from '@/components/ui';
import { IInput } from '@/components/ui/Input';
import { ILabel } from '@/components/ui/Label';
import { ITextError } from '@/components/ui/TextError';

interface IFormInputBox extends IInput, ILabel, ITextError {
	// errors: React.ReactNode | React.ReactNode[];
}

export default function FormInputBox({
	labelText,
	mandatory,
	id,
	type,
	name,
	autoComplete,
	defaultValue,
	errors,
	errorClassName,
	// onChange,
}: IFormInputBox) {
	return (
		<div>
			<Label htmlFor={id} labelText={labelText} mandatory={mandatory} />
			<Input
				id={id}
				type={type}
				name={name}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
				// onChange={onChange}
			/>
			{
				errors && (
					// (Array.isArray(errors) ? (
					// 	<div className="error">
					// 		<p>Password must: {errors}</p>
					// 		<ul className="list-disc list-inside ml-4">
					// 			{errors.map((error) => (
					// 				<li key={error}>{error}</li>
					// 			))}
					// 		</ul>
					// 	</div>
					// ) : (
					<>
						8{errors}8
						<TextError errors={errors} errorClassName={errorClassName} />
					</>
				)
				//))}
			}
		</div>
	);
}
