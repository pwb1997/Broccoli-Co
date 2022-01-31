import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('<Header />', () => {
    test('should contain company name', async () => {
        render(<Header />);

        expect(screen.getByRole('banner')).toHaveTextContent(/broccoli & co./i);
    });
});
