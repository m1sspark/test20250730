
import React from 'react';

interface PraiseButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PraiseButton: React.FC<PraiseButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-20 h-20 bg-rose-600 rounded-full shadow-lg transform transition-transform duration-150 active:scale-95 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-400 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-inner flex items-center justify-center"
  >
    <span className="text-white text-3xl font-bold font-sans select-none">A</span>
  </button>
);
