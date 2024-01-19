import React from 'react';

interface ButtonProps {
    title: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 uppercase text-white px-6 py-2 bg-primary hover:bg-[#60b0ff]"
        >
            <span>{icon}</span>
            <span>{title}</span>
        </button>
    );
};

export default Button;
