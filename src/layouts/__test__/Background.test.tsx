import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Background from '../Background';

describe('<Background />', () => {
    test('should contain video', async () => {
        render(<Background />);

        expect(screen.getByTestId('backgroundVideo')).toBeInTheDocument();
    });
});
