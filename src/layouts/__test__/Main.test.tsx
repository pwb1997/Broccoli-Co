import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../Main';

describe('<Main />', () => {
    test('should contain request invite button', async () => {
        render(<Main />);

        expect(screen.getByRole('button', { name: /request an invite/i })).toBeInTheDocument();
    });

    test('should open modal after clicking request invite button', async () => {
        render(<Main />);

        fireEvent.click(screen.getByRole('button', { name: /request an invite/i }));

        await screen.findByRole('dialog');
    });
});
