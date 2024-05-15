import React from 'react';

interface IAddButtonProps {
    onClick: () => void; // Event handler for clicking the button
}

export const AddButton: React.FC<IAddButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            <span className="text-5xl w-fit h-fit mb-[10px] ml-[2px]">+</span>
        </button>
    );
};

