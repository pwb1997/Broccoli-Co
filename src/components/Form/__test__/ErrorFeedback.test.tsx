import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorFeedback from '../ErrorFeedback';

describe('<ErrorFeedback />', () => {
    test('should display all errors', async () => {
        const errors = ['error1', 'error2', 'error3'];

        render(<ErrorFeedback {...{ errors }} />);

        expect(screen.getByRole('alert')).toHaveTextContent('error1');
        expect(screen.getByRole('alert')).toHaveTextContent('error2');
        expect(screen.getByRole('alert')).toHaveTextContent('error3');
    });
});
