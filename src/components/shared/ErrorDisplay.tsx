
import React from 'react';
import Button from '../ui/Button';
import { AlertTriangleIcon, RefreshIcon } from './Icon';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
    onRestart: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, onRestart }) => {
    return (
        <div className="w-full max-w-2xl text-center bg-slate-800 p-8 rounded-lg border border-red-500/50 animate-fade-in-up">
            <AlertTriangleIcon className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-100 mb-2">An Error Occurred</h2>
            <p className="text-slate-400 mb-8">{message}</p>
            <div className="flex justify-center gap-4">
                <Button onClick={onRetry}>
                    <RefreshIcon className="w-5 h-5 mr-2"/>
                    Try Again
                </Button>
                 <button 
                    onClick={onRestart}
                    className="font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default ErrorDisplay;
