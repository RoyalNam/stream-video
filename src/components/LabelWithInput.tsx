import React from 'react';
interface LabelWithInputProps {
    title: string;
    type?: 'text' | 'number' | 'email' | 'password';
}

const LabelWithInput: React.FC<LabelWithInputProps> = ({ title, type = 'text' }) => {
    return (
        <div className="flex flex-col gap-1 text-lg">
            <label>{title}</label>
            <input type={type} title={title} className="bg-secondary py-3 pl-3 pr-1" />
        </div>
    );
};

export default LabelWithInput;
