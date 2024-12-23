import { Button } from '@/components/ui';

interface IConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
}

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Are you sure?',
	description = 'This action cannot be undone.',
}: IConfirmationModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-lg">
				<h2 className="text-xl font-semibold mb-4">{title}</h2>
				<p className="mb-4">{description}</p>
				<div className="flex justify-end space-x-4">
					<Button text="Cancel" onClick={onClose} className="btn-secondary" />
					<Button text="Confirm" onClick={onConfirm} />
				</div>
			</div>
		</div>
	);
}
