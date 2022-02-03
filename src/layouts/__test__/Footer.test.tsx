import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('<Footer />', () => {
    test('should contain copyright', async () => {
        render(<Footer />);

        expect(screen.getByRole('contentinfo')).toHaveTextContent(/all rights reserved/i);
    });
});
