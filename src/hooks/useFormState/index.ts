import { FormProps } from '../../components/Form';
import useFieldHighlights from './useFieldHighlights';
import useFormInputs from './useFormInputs';
import useFormSubmission from './useFormSubmission';
import useFormValidation from './useFormValidation';
import useValidationAndSubmissionResult from './useValidationAndSubmissionResult';

const useFormState = <T extends string>(
    fieldNames: readonly T[],
    onValidate: FormProps<T>['onValidate'],
    onSubmit: FormProps<T>['onSubmit'],
) => {
    const [inputValues, setInputValue] = useFormInputs(fieldNames);

    const [validationResult, validateForm] = useFormValidation<T>(inputValues, onValidate);

    const [{ submissionResult, submitting }, submitForm] = useFormSubmission(inputValues, onSubmit);

    const [fieldHighlights, removeFieldHighlight] = useFieldHighlights(
        fieldNames,
        validationResult,
    );

    const validationAndSubmissionResult = useValidationAndSubmissionResult(
        validationResult,
        submissionResult,
    );

    return [
        {
            inputValues,
            submitting,
            fieldHighlights,
            validationAndSubmissionResult,
        },
        {
            setInputValue,
            validateForm,
            submitForm,
            removeFieldHighlight,
        },
    ] as const;
};

export default useFormState;
