import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../Main/index';

describe('<Main />', () => {
    test('should contain request invite button', async () => {
        render(<Main />);

        expect(screen.getByRole('button')).toHaveTextContent(/request an invite/i);
    });

    test('clicking invite button should open modal', async () => {
        render(<Main />);

        fireEvent(
            screen.getByRole('button', { name: /request an invite/i }),
            new MouseEvent('click', { bubbles: true }),
        );

        await screen.findByRole('dialog');
    });
});
