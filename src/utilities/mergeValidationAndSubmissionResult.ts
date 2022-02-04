import {
    FormSubmissionResult,
    FormValidationAndSubmissionResult,
    FormValidationResult,
} from '../components/Form';

const mergeValidationAndSubmissionResult = <T extends string>(
    validationResult: FormValidationResult<T>,
    submissionResult: FormSubmissionResult,
): FormValidationAndSubmissionResult => {
    let Err: string[] = [];

    if (!validationResult.Ok) {
        Err = Object.values(validationResult.Err as Record<string, string[]>).flat();
    } else if (!submissionResult.Ok) {
        Err = [submissionResult.Err];
    }

    return Err.length > 0 ? { Ok: false, Err } : { Ok: true };
};

export default mergeValidationAndSubmissionResult;
