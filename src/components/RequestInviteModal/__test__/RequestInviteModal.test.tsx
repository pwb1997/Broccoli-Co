import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RequestInviteModal from '..';
import userEvent from '@testing-library/user-event';

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

        await screen.findByText(/all done/i, undefined, { timeout: 15000 });
    });

    test('should trigger hide', async () => {
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

        const okButton = await screen.findByRole('button', { name: /ok/i }, { timeout: 15000 });

        userEvent.click(okButton);

        expect(handleHide).toBeCalled();
    });
});
