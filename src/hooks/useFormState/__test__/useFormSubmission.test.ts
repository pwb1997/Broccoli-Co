import { act, renderHook } from '@testing-library/react-hooks';
import { FormSubmissionResult } from '../../../components/Form';
import useFormSubmission from '../useFormSubmission';
import { waitFor } from '@testing-library/react';

const mockRequest = () => new Promise((res) => setTimeout(res));

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

    test('should set submitting to true', async () => {
        const onSubmit = async (): Promise<FormSubmissionResult> => {
            await mockRequest();
            return { Ok: true };
        };

        const { result } = renderHook(() => useFormSubmission({}, onSubmit));

        const [, submitForm] = result.current;

        act(() => {
            submitForm();
        });

        expect(result.current[0].submitting).toBe(true);
    });

    test('should set submitting to false', async () => {
        const onSubmit = async (): Promise<FormSubmissionResult> => {
            await mockRequest();
            return { Ok: false, Err: 'error' };
        };

        const { result } = renderHook(() => useFormSubmission({}, onSubmit));

        const [, submitForm] = result.current;

        await act(async () => {
            await submitForm();
        });

        await waitFor(() => expect(result.current[0].submitting).toBe(false));
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

        await waitFor(() =>
            expect(result.current[0].submissionResult).toStrictEqual(submissionResult),
        );
    });
});
