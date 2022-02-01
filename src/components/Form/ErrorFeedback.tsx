interface ErrorFeedbackProps {
    errors: string[];
}

const ErrorFeedback = ({ errors }: ErrorFeedbackProps) => {
    return (
        <div
            role="alert"
            className="w-full mt-2 overflow-hidden text-sm font-bold text-center text-red-500 whitespace-pre"
        >
            {errors.map((error, idx) => (
                <span key={idx}>{error}</span>
            ))}
        </div>
    );
};

export default ErrorFeedback;
