import { FormEventHandler } from 'react';
import FormInput from './FormInput';
import { upperFirst, lowerCase, compact } from 'lodash-es';
import ErrorFeedback from './ErrorFeedback';
import useFormState from './useFormState';

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
        { inputValues, inputHighlights, submitting, validationAndSubmissionResult },
        { setInputValue, removeInputHighlight, validateInputValues, submitInputValues },
    ] = useFormState(fieldNames, onValidate, onSubmit);

    const onFormSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault();

        validateInputValues() && (await submitInputValues());
    };

    return (
        <form className="flex flex-col items-center flex-1 w-full" onSubmit={onFormSubmit}>
            <div className="flex flex-col justify-center flex-1 w-full gap-4">
                {fieldNames.map((name) => (
                    <FormInput
                        value={inputValues[name]}
                        setValue={(val) => setInputValue(name, val)}
                        placeholder={upperFirst(lowerCase(name))}
                        highlight={inputHighlights[name]}
                        removeHighlight={() => removeInputHighlight(name)}
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
            {!validationAndSubmissionResult.Ok ? (
                <ErrorFeedback errors={compact(validationAndSubmissionResult.Err)} />
            ) : null}
        </form>
    );
};

export default Form;
