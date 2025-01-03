import React from 'react';
import { Input, Label, TextError } from '@/components/ui';
import { IInput } from '@/components/ui/Input';
import { ILabel } from '@/components/ui/Label';
import { ITextError } from '@/components/ui/TextError';

interface IFormInputBox extends IInput, ILabel, ITextError {}

export default function FormInputBox({
	labelText,
	required,
	id,
	type,
	name,
	autoComplete,
	defaultValue,
	errors,
	errorClassName,
}: IFormInputBox) {
	return (
		<div>
			<Label htmlFor={id} labelText={labelText} required={required} />
			<Input
				id={id}
				type={type}
				name={name}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
			/>
			<TextError errors={errors} errorClassName={errorClassName} />
		</div>
	);
}
