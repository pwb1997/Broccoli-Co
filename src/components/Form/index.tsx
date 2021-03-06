import { lowerCase, upperFirst } from 'lodash-es';
import ErrorFeedback from './ErrorFeedback';
import { FormEventHandler } from 'react';
import FormInput from './FormInput';
import useFormState from '../../hooks/useFormState';

export type FormSubmissionResult = { Ok: true } | { Ok: false; Err: string };

export type FormValidationResult<T extends string> =
    | { Ok: true }
    | { Ok: false; Err: Partial<Record<T, string[]>> };

export type FormValidationAndSubmissionResult = { Ok: true } | { Ok: false; Err: string[] };

export interface FormProps<T extends string> {
    fieldNames: readonly T[];
    submitButtonText: string;
    submittingButtonText: string;
    onValidate: (val: Record<T, string>) => FormValidationResult<T>;
    onSubmit: (val: Record<T, string>) => Promise<FormSubmissionResult> | FormSubmissionResult;
}

const Form = <T extends string>({
    fieldNames,
    submitButtonText,
    submittingButtonText,
    onValidate,
    onSubmit,
}: FormProps<T>) => {
    const [
        { inputValues, fieldHighlights, submitting, validationAndSubmissionResult },
        { setInputValue, removeFieldHighlight, validateForm, submitForm },
    ] = useFormState(fieldNames, onValidate, onSubmit);

    const onFormSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault();

        validateForm() && (await submitForm());
    };

    return (
        <form className="relative flex flex-col items-center flex-1 w-full" onSubmit={onFormSubmit}>
            <div className="flex flex-col justify-center flex-1 w-full gap-4">
                {fieldNames.map((name) => (
                    <FormInput
                        value={inputValues[name]}
                        setValue={(val) => setInputValue(name, val)}
                        placeholder={upperFirst(lowerCase(name))}
                        highlight={fieldHighlights[name]}
                        removeHighlight={() => removeFieldHighlight(name)}
                        key={name}
                    />
                ))}
            </div>
            <button
                className="w-full px-4 py-2 mt-12 text-sm font-bold text-gray-500 border border-gray-500"
                type="submit"
            >
                {submitting ? submittingButtonText : submitButtonText}
            </button>
            <ErrorFeedback {...{ validationAndSubmissionResult }} />
        </form>
    );
};

export default Form;
