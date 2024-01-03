import React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
    return (
        <button onClick={onClick} className="uppercase text-white px-7 py-3 bg-primary hover:bg-[#60b0ff]">
            {title}
        </button>
    );
};

export default Button;
