interface SuccessStageProps {
    onOk: () => void;
}

const SuccessStage = ({ onOk }: SuccessStageProps) => {
    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <span className="text-2xl italic font-bold text-gray-500">All done!</span>
            <div className="w-8 border-t border-gray-500" />
            <div className="flex items-center justify-center flex-1">
                <p className="text-center text-gray-500">
                    You will be one of the first to experience Broccoli & Co. when we launch.
                </p>
            </div>
            <button
                className="w-full px-4 py-2 mb-4 text-sm font-bold text-gray-500 border border-gray-500"
                onClick={() => onOk()}
            >
                OK
            </button>
        </div>
    );
};

export default SuccessStage;
