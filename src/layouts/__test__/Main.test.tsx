import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Main from '../Main';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<Main />', () => {
    test('should contain request invite button', async () => {
        render(<Main />);

        expect(screen.getByRole('button', { name: /request an invite/i })).toBeInTheDocument();
    });

    test('should open modal', async () => {
        render(<Main />);

        userEvent.click(screen.getByRole('button', { name: /request an invite/i }));

        await screen.findByRole('dialog');
    });

    test('should close modal', async () => {
        mockedAxios.post.mockResolvedValue('OK');

        render(<Main />);

        userEvent.click(screen.getByRole('button', { name: /request an invite/i }));

        await screen.findByRole('dialog');

        userEvent.type(screen.getByPlaceholderText(/^full name/i), 'test');
        userEvent.type(screen.getByPlaceholderText(/^email/i), 'test@test.com');
        userEvent.type(screen.getByPlaceholderText(/^confirm email/i), 'test@test.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        const okButton = await screen.findByRole('button', { name: /ok/i });

        userEvent.click(okButton);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
