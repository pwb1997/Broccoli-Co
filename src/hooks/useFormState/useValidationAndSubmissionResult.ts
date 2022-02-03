import {
    FormValidationResult,
    FormSubmissionResult,
    FormValidationAndSubmissionResult,
} from '../../components/Form';

const useValidationAndSubmissionResult = <T extends string>(
    validationResult: FormValidationResult<T>,
    submissionResult: FormSubmissionResult,
): FormValidationAndSubmissionResult => {
    const Err: string[] = [];

    if (!validationResult.Ok) {
        Err.push(...Object.values(validationResult.Err as Record<string, string[]>).flat());
    }

    if (!submissionResult.Ok) {
        Err.push(submissionResult.Err);
    }

    return Err.length > 0 ? { Ok: false, Err } : { Ok: true };
};

export default useValidationAndSubmissionResult;
