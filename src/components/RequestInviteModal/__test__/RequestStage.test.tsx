import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import RequestStage from '../RequestStage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<RequestStage />', () => {
    test('should display title', async () => {
        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        expect(screen.getByText(/request an invite/i)).toBeInTheDocument();
    });

    test('should contain full name field', async () => {
        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        expect(screen.getByPlaceholderText(/^full name/i)).toBeInTheDocument();
    });

    test('should contain email field', async () => {
        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        expect(screen.getByPlaceholderText(/^email/i)).toBeInTheDocument();
    });

    test('should contain confirm email field', async () => {
        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        expect(screen.getByPlaceholderText(/^confirm email/i)).toBeInTheDocument();
    });

    test('should trigger onSuccess', async () => {
        mockedAxios.post.mockResolvedValueOnce('OK');

        const handleSuccess = jest.fn();

        render(
            <RequestStage
                onSuccess={() => {
                    handleSuccess();
                }}
            />,
        );

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'test');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'test@test.com');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'test@test.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(handleSuccess).toBeCalled());
    });

    test('should handle validation error', async () => {
        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'a');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'a@a');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'b@a');
        userEvent.click(screen.getByRole('button'));

        screen.getAllByRole('textbox').forEach((inputField) => {
            expect(inputField).toHaveClass('border-red-500');
        });

        await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/at least 3/i));
        expect(screen.getByRole('alert')).toHaveTextContent(/invalid email/i);
        expect(screen.getByRole('alert')).toHaveTextContent(/email don\'t match/i);
    });

    test('should handle server error', async () => {
        mockedAxios.post.mockRejectedValueOnce({ message: 'request failed' });

        render(
            <RequestStage
                onSuccess={() => {
                    //
                }}
            />,
        );

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'test');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'usedemail@airwallex.com');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'usedemail@airwallex.com');
        userEvent.click(screen.getByRole('button'));

        await screen.findByText(/request failed/i);
    });
});
