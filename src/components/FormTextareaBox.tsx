import React from 'react';
import { Textarea, Label, TextError } from '@/components/ui';
import { ITextarea } from '@/components/ui/Textarea';
import { ILabel } from '@/components/ui/Label';
import { ITextError } from '@/components/ui/TextError';

interface IFormTextareaBox extends ITextarea, ILabel, ITextError {}

export default function FormTextareaBox({
	labelText,
	required,
	id,
	name,
	autoComplete,
	defaultValue,
	errors,
	errorClassName,
}: IFormTextareaBox) {
	return (
		<div>
			<Label htmlFor={id} labelText={labelText} required={required} />
			<Textarea
				id={id}
				name={name}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
			/>
			<TextError errors={errors} errorClassName={errorClassName} />
		</div>
	);
}
