import toast from 'react-hot-toast';
import { useState } from 'react';
import { IActionFormState } from '@/types/interfaces';

type AsyncAction<T> = (...args: any[]) => Promise<T>;

type UseAsyncActionReturn<T> = [
	(
		action: AsyncAction<IActionFormState | undefined>,
		callback: Function,
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
