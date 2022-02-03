import { useState } from 'react';
import { FormProps, FormSubmissionResult } from '../../components/Form';

const useFormSubmission = <T extends string>(
    inputValues: Record<T, string>,
    onSubmit: FormProps<T>['onSubmit'],
) => {
    const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult>({ Ok: true });
    const [submitting, setSubmitting] = useState(false);

    const submitForm = async () => {
        setSubmitting(true);
        setSubmissionResult({ Ok: true });

        const result = await onSubmit(inputValues);

        if (!result.Ok) {
            setSubmitting(false);
            setSubmissionResult(result);
        }

        return result.Ok;
    };

    return [{ submitting, submissionResult }, submitForm] as const;
};

export default useFormSubmission;
