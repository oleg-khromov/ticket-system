'use client';
import { useState } from 'react';

interface IUseConfirmationModalResult {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	confirmAction: () => void;
	setOnConfirm: (action: () => void) => void;
}

export const useConfirmationModal = (): IUseConfirmationModalResult => {
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
