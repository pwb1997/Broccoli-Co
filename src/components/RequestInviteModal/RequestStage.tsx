import Form, { FormSubmissionResult } from '../Form';
import validateRequestForm from './validateRequestForm';

interface RequestStageProps {
    onSuccess: () => void;
}

const RequestStage = ({ onSuccess }: RequestStageProps) => {
    const fieldNames = ['fullName', 'email', 'confirmEmail'] as const;

    const onSubmit = async (
        val: Record<typeof fieldNames[number], string>,
    ): Promise<FormSubmissionResult> => {
        await new Promise((res) => {
            setTimeout(res, 1000);
        }); // mock a request
        onSuccess();
        return { Ok: true };
    };

    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <span className="text-2xl italic font-bold text-gray-500">Request an invite</span>
            <div className="w-8 border-t border-gray-500" />
            <Form
                fieldNames={fieldNames}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={validateRequestForm}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default RequestStage;
