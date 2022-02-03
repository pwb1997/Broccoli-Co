import { act, renderHook } from '@testing-library/react-hooks';
import { FormSubmissionResult } from '../../../components/Form';
import useFormSubmission from '../useFormSubmission';

describe('hooks/useFormState/useFormSubmission', () => {
    test('should trigger submission function', async () => {
        const handleSubmission = jest.fn();

        const onSubmit = (): FormSubmissionResult => {
            handleSubmission();
            return { Ok: true };
        };

        const { result } = renderHook(() => useFormSubmission({}, onSubmit));

        const [, submitForm] = result.current;

        act(() => {
            submitForm();
        });

        expect(handleSubmission).toBeCalled();
    });

    test('should update submission result', async () => {
        const submissionResult: FormSubmissionResult = {
            Ok: false,
            Err: 'error',
        };

        const onSubmit = () => ({ ...submissionResult });

        const { result } = renderHook(() => useFormSubmission({}, onSubmit));

        const [, submitForm] = result.current;

        act(() => {
            submitForm();
        });

        expect(result.current[0]).toStrictEqual(submissionResult);
    });
});
