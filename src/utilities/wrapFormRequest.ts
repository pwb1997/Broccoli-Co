import { FormSubmissionResult } from '../components/Form';
import { ServerError } from './handleApiError';

const wrapFormRequest =
    (
        apiRequest: () => Promise<unknown>,
        onSuccess: () => void,
    ): (() => Promise<FormSubmissionResult>) =>
    async () => {
        try {
            await apiRequest();

            onSuccess();
            return { Ok: true };
        } catch (error) {
            if (error instanceof ServerError) {
                return { Ok: false, Err: error.message };
            }

            throw error;
        }
    };

export default wrapFormRequest;
