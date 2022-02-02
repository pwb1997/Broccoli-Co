import postRequestInvite from '../../apis/postRequestInvite';
import Form, { FormSubmissionResult } from '../Form';
import validateRequestForm from './validateRequestForm';

interface RequestStageProps {
    onSuccess: () => void;
}

const RequestStage = ({ onSuccess }: RequestStageProps) => {
    const fieldNames = ['fullName', 'email', 'confirmEmail'] as const;

    const submitRequestForm = async ({
        email,
        fullName,
    }: Record<typeof fieldNames[number], string>): Promise<FormSubmissionResult> => {
        try {
            await postRequestInvite({ name: fullName, email });

            onSuccess();
            return { Ok: true };
        } catch (error) {
            return { Ok: false, Err: (error as Error).message };
        }
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
                onSubmit={submitRequestForm}
            />
        </div>
    );
};

export default RequestStage;
