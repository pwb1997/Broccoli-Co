import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form, { FormSubmissionResult, FormValidationResult } from '.';

describe('<Form />', () => {
    test('should contain input fields', async () => {
        const fields = ['field1', 'field2', 'field3'];

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={() => ({ Ok: true })}
                onSubmit={async () => ({ Ok: true })}
            />,
        );

        expect(screen.getAllByPlaceholderText(/field/i).length).toBe(fields.length);
    });

    test('should trigger validate and submit', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleValidationAndSubmission = jest.fn();

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
            handleValidationAndSubmission();
            return { Ok: true };
        };

        const onSubmit = (): FormSubmissionResult => {
            handleValidationAndSubmission();
            return { Ok: true };
        };

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={onValidate}
                onSubmit={onSubmit}
            />,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(handleValidationAndSubmission).toBeCalledTimes(2);
    });

    test('should display submitting text after triggered', async () => {
        const fields = ['field1', 'field2', 'field3'];

        const mockRequest = () => new Promise((res) => setTimeout(res, 1000));

        const onSubmit = async (): Promise<FormSubmissionResult> => {
            await mockRequest();
            return { Ok: true };
        };

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={() => ({ Ok: true })}
                onSubmit={onSubmit}
            />,
        );

        fireEvent.click(screen.getByRole('button'));

        await screen.findByRole('button', { name: /sending/i });
    });

    test('should highlight input on validation error', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleValidation = jest.fn();

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
            handleValidation();

            return {
                Ok: false,
                Err: {
                    field1: ['field1 error'],
                    field3: ['field3 error'],
                },
            };
        };

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={onValidate}
                onSubmit={() => ({ Ok: true })}
            />,
        );

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleValidation).toBeCalled());

        expect(screen.getByPlaceholderText('Field 1')).toHaveClass('border-red-500');
        expect(screen.getByPlaceholderText('Field 3')).toHaveClass('border-red-500');
    });

    test('should display validation error message on validation error', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleValidation = jest.fn();

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
            handleValidation();

            return {
                Ok: false,
                Err: {
                    field1: ['field1 error'],
                    field3: ['field3 error'],
                },
            };
        };

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={onValidate}
                onSubmit={() => ({ Ok: true })}
            />,
        );

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleValidation).toBeCalled());

        expect(screen.getByRole('alert')).toHaveTextContent('field1 error');
        expect(screen.getByRole('alert')).toHaveTextContent('field3 error');
    });

    test('should display server error message on server error', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleSubmission = jest.fn();

        const onSubmit = (): FormSubmissionResult => {
            handleSubmission();

            return {
                Ok: false,
                Err: 'server error',
            };
        };

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={() => ({ Ok: true })}
                onSubmit={onSubmit}
            />,
        );

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleSubmission).toBeCalled());

        expect(screen.getByRole('alert')).toHaveTextContent('server error');
    });
});
