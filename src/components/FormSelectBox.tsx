import React from 'react';
import { Select, Label, TextError } from '@/components/ui';
import { ISelect } from '@/components/ui/Select';
import { ILabel } from '@/components/ui/Label';
import { ITextError } from '@/components/ui/TextError';

interface IFormSelectBox extends ISelect, ILabel, ITextError {}

export default function FormSelectBox({
	labelText,
	required,
	id,
	name,
	value,
	errors,
	errorClassName,
	options,
	onChange,
}: IFormSelectBox) {
	return (
		<div>
			<Label htmlFor={id} labelText={labelText} required={required} />
			<Select
				id={id}
				name={name}
				value={value}
				options={options}
				onChange={onChange}
			/>
			<TextError errors={errors} errorClassName={errorClassName} />
		</div>
	);
}
