import { ReactNode } from 'react';

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
                {children}
                <button
                    onClick={onClose}
                    className="absolute bottom-4 left-4 bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
}