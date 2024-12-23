'use client';
import { useState, useEffect } from 'react';

export function useData<T>(fn: () => Promise<T>, deps: any[] = []) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const result = await fn();
				setData(result);
			} catch (err: any) {
				setError(err.message || 'Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fn, ...deps]);

	return { data, loading, error, setData };
}
