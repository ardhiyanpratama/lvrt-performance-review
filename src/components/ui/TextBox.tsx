import React from 'react';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    size?: "md" | "lg";
    variant?: "default" | "outline";
}

const TextBox: React.FC<TextBoxProps> = ({ label, error, ...props }) => (
    <div style={{ marginBottom: '1rem' }}>
        {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
        <div
            className="
                flex items-center gap-3
                w-full max-w-sm
                px-4 py-3
                border border-gray-300 dark:border-gray-700
                rounded-xl
                bg-white dark:bg-gray-900
                text-gray-800 dark:text-gray-100
                focus-within:ring-2 focus-within:ring-blue-500
                transition-all duration-300
            "
            >
            {/* Input box */}
            <input
                type="email"
                placeholder="Continue with Email"
                className="
                w-full bg-transparent outline-none
                text-sm placeholder-gray-500 dark:placeholder-gray-400
                "
            />
        </div>
        {error && <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
    </div>
);

export default TextBox;