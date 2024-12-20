import { useState } from 'react';

interface UseConfirmationModalResult {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	confirmAction: () => void;
	// eslint-disable-next-line no-unused-vars
	setOnConfirm: (action: () => void) => void;
}

export const useConfirmationModal = (): UseConfirmationModalResult => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [onConfirm, setOnConfirmAction] = useState<(() => void) | null>(null);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const confirmAction = () => {
		if (onConfirm) onConfirm();
		closeModal();
	};

	const setOnConfirm = (action: () => void) => setOnConfirmAction(() => action);

	return { isModalOpen, openModal, closeModal, confirmAction, setOnConfirm };
};
