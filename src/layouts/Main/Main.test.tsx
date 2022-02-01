import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Main from '.';

describe('<Main />', () => {
    afterAll(() => cleanup());

    test('should contain request invite button', async () => {
        render(<Main />);

        expect(screen.getByRole('button')).toHaveTextContent(/request an invite/i);
    });

    test('clicking invite button should open modal', async () => {
        fireEvent.click(screen.getByRole('button', { name: /request an invite/i }));

        await screen.findByRole('dialog');
    });
});
