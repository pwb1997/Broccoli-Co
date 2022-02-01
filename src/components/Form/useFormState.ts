import { useEffect, useState } from 'react';
import {
    FormProps,
    FormSubmissionResult,
    FormValidationAndSubmissionResult,
    FormValidationResult,
} from '.';

const useInputValues = <T extends string>(fieldNames: readonly T[]) => {
    const initialInputValues = Object.fromEntries(fieldNames.map((name) => [name, ''])) as Record<
        T,
        string
    >;

    const [inputValues, setInputValues] = useState({ ...initialInputValues });

    const setInputValue = (fieldName: T, value: string) =>
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });

    return [inputValues, setInputValue] as const;
};

const useValidateInputValues = <T extends string>(
    inputValues: Record<T, string>,
    onValidate: FormProps<T>['onValidate'],
) => {
    const [validationResult, setValidationResult] = useState<FormValidationResult<T>>({
        Ok: true,
    });

    const validateInputValues = () => {
        const result = onValidate(inputValues);
        setValidationResult(result);

        return result.Ok;
    };

    return [validationResult, validateInputValues] as const;
};

const useSubmitInputValues = <T extends string>(
    inputValues: Record<T, string>,
    onSubmit: FormProps<T>['onSubmit'],
) => {
    const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult>({ Ok: true });
    const [submitting, setSubmitting] = useState(false);

    const submitInputValues = async () => {
        setSubmitting(true);
        setSubmissionResult({ Ok: true });

        const result = await onSubmit(inputValues);

        if (!result.Ok) {
            setSubmitting(false);
            setSubmissionResult(result);
        }

        return result.Ok;
    };

    return [{ submitting, submissionResult }, submitInputValues] as const;
};

const useInputHighlights = <T extends string>(
    fieldNames: readonly T[],
    validationResult: FormValidationResult<T>,
) => {
    const initialInputHighlights = Object.fromEntries(
        fieldNames.map((name) => [name, false]),
    ) as Record<T, boolean>;

    const [inputHighlights, setInputHighlights] = useState({ ...initialInputHighlights });

    useEffect(() => {
        const newInputHighlights = { ...initialInputHighlights };

        if (!validationResult.Ok) {
            Object.keys(validationResult.Err).forEach((key) => {
                newInputHighlights[key as T] = true;
            });
        }

        setInputHighlights(newInputHighlights);
    }, [validationResult]);

    const removeInputHighlight = (fieldName: T) =>
        setInputHighlights({
            ...inputHighlights,
            [fieldName]: false,
        });

    return [inputHighlights, removeInputHighlight] as const;
};

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

const useFormState = <T extends string>(
    fieldNames: readonly T[],
    onValidate: FormProps<T>['onValidate'],
    onSubmit: FormProps<T>['onSubmit'],
) => {
    const [inputValues, setInputValue] = useInputValues(fieldNames);

    const [validationResult, validateInputValues] = useValidateInputValues<T>(
        inputValues,
        onValidate,
    );

    const [{ submissionResult, submitting }, submitInputValues] = useSubmitInputValues(
        inputValues,
        onSubmit,
    );

    const [inputHighlights, removeInputHighlight] = useInputHighlights(
        fieldNames,
        validationResult,
    );

    const validationAndSubmissionResult = useValidationAndSubmissionResult(
        validationResult,
        submissionResult,
    );

    return [
        { inputValues, submitting, inputHighlights, validationAndSubmissionResult },
        { setInputValue, validateInputValues, submitInputValues, removeInputHighlight },
    ] as const;
};

export default useFormState;
