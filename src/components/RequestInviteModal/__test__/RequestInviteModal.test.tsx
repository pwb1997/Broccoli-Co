import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RequestInviteModal from '..';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<RequestInviteModal />', () => {
    test('should contain <RequestStage />', async () => {
        render(
            <RequestInviteModal
                isVisible={true}
                hide={() => {
                    //
                }}
            />,
        );

        expect(screen.getByText(/request an invite/i)).toBeInTheDocument();
    });

    test('should contain <SuccessStage />', async () => {
        mockedAxios.post.mockResolvedValueOnce('OK');

        render(
            <RequestInviteModal
                isVisible={true}
                hide={() => {
                    //
                }}
            />,
        );

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'test');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'test@test.com');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'test@test.com');
        userEvent.click(screen.getByRole('button'));

        await screen.findByText(/all done/i);
    });

    test('should trigger hide', async () => {
        mockedAxios.post.mockResolvedValueOnce('OK');

        const handleHide = jest.fn();

        render(
            <RequestInviteModal
                isVisible={true}
                hide={() => {
                    handleHide();
                }}
            />,
        );

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'test');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'test@test.com');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'test@test.com');
        userEvent.click(screen.getByRole('button'));

        const okButton = await screen.findByRole('button', { name: /ok/i });

        userEvent.click(okButton);

        expect(handleHide).toBeCalled();
    });
});
