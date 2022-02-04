import Form from '../Form';
import mergeValidationResults from '../../utilities/mergeValidationResults';
import postRequestInvite from '../../apis/postRequestInvite';
import validateConfirmEmail from '../../utilities/validateConfirmEmail';
import validateEmail from '../../utilities/validateEmail';
import validateFullName from '../../utilities/validateFullName';
import wrapFormRequest from '../../utilities/wrapFormRequest';

interface RequestStageProps {
    onSuccess: () => void;
}

const RequestStage = ({ onSuccess }: RequestStageProps) => {
    const fieldNames = ['fullName', 'email', 'confirmEmail'] as const;

    const validateForm = (fields: Record<typeof fieldNames[number], string>) =>
        mergeValidationResults({
            fullName: validateFullName(fields.fullName),
            email: validateEmail(fields.email),
            confirmEmail: validateConfirmEmail(fields.email, fields.confirmEmail),
        });

    const submitForm = (fields: Record<typeof fieldNames[number], string>) =>
        wrapFormRequest(
            () => postRequestInvite({ name: fields.fullName, email: fields.email }),
            onSuccess,
        )();

    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <span className="text-2xl italic font-bold text-gray-500">Request an invite</span>
            <div className="w-8 border-t border-gray-500" />
            <Form
                fieldNames={fieldNames}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={validateForm}
                onSubmit={submitForm}
            />
        </div>
    );
};

export default RequestStage;
