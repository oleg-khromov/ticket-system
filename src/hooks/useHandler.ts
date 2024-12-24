import toast from 'react-hot-toast';
import { useState } from 'react';
import { IActionFormState } from '@/types/interfaces';

// eslint-disable-next-line no-unused-vars
type AsyncAction<T> = (...args: any[]) => Promise<T>;

// eslint-disable-next-line no-unused-vars
type UseAsyncActionReturn<T> = [
	(
		// eslint-disable-next-line no-unused-vars
		action: AsyncAction<IActionFormState | undefined>,
		// eslint-disable-next-line no-unused-vars
		callback: Function,
		// eslint-disable-next-line no-unused-vars
		updatedField?: string,
	) => Promise<void>,
	boolean,
];

export function useHandler<T>(): UseAsyncActionReturn<T> {
	const [loading, setLoading] = useState(false);

	const execute = async (
		action: AsyncAction<IActionFormState | undefined>,
		callback: Function,
		updatedField: string = '',
	): Promise<void> => {
		setLoading(true);
		try {
			const result = await action();
			if (result?.success && result?.message) {
				toast.success(result.message);
				if (callback)
					if (result?.data && result?.data?.[updatedField])
						callback(result?.data?.[updatedField]);
					else callback();
			} else if (result?.message) {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error('An unexpected error occurred.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return [execute, loading];
}
