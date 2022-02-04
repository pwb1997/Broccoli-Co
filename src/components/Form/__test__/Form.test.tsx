import '@testing-library/jest-dom';
import Form, { FormSubmissionResult, FormValidationResult } from '..';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    test('should trigger validate', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleValidation = jest.fn();

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
            handleValidation();
            return { Ok: true };
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

        userEvent.click(screen.getByRole('button'));

        expect(handleValidation).toBeCalled();
    });

    test('should trigger submit', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const handleSubmission = jest.fn();

        const onSubmit = (): FormSubmissionResult => {
            handleSubmission();
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

        userEvent.click(screen.getByRole('button'));

        expect(handleSubmission).toBeCalled();
    });

    test('should display submitting text', async () => {
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

        userEvent.click(screen.getByRole('button'));

        await screen.findByRole('button', { name: /sending/i });
    });

    test('should highlight input fields', async () => {
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

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleValidation).toBeCalled());

        expect(screen.getByPlaceholderText('Field 1')).toHaveClass('border-red-500');
        expect(screen.getByPlaceholderText('Field 3')).toHaveClass('border-red-500');
    });

    test('should remove highlight', async () => {
        const fields = ['field'] as const;

        const handleValidation = jest.fn();

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
            handleValidation();

            return { Ok: false, Err: { field: ['error'] } };
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

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleValidation).toBeCalled());

        const inputField = screen.getByRole('textbox');

        expect(inputField).toHaveClass('border-red-500');

        userEvent.type(inputField, 'something');

        expect(inputField).not.toHaveClass('border-red-500');
    });

    test('should display validation error messages', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const onValidate = (): FormValidationResult<typeof fields[number]> => {
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

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('field1 error'));
        expect(screen.getByRole('alert')).toHaveTextContent('field3 error');
    });

    test('should display server error message', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const onSubmit = (): FormSubmissionResult => ({ Ok: false, Err: 'server error' });

        render(
            <Form
                fieldNames={fields}
                submitButtonText="Send"
                submittingButtonText="Sending, please wait..."
                onValidate={() => ({ Ok: true })}
                onSubmit={onSubmit}
            />,
        );

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('server error'));
    });
});
