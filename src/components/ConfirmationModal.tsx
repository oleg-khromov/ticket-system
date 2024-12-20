interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
}

export const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Are you sure?',
	description = 'This action cannot be undone.',
}: ConfirmationModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-lg">
				<h2 className="text-xl font-semibold mb-4">{title}</h2>
				<p className="mb-4">{description}</p>
				<div className="flex justify-end space-x-4">
					<button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-red-500 text-white rounded"
						onClick={onConfirm}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};
