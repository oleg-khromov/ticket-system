import { useEffect } from 'react';
import toast from 'react-hot-toast';

type FormToastState = {
	success?: boolean;
	message?: string;
};

export const useFormToast = (state?: FormToastState) => {
	useEffect(() => {
		if (state) {
			if (state.message) {
				if (state.success) toast.success(state.message);
				else toast.error(state.message);
			}
		}
	}, [state]);
};
