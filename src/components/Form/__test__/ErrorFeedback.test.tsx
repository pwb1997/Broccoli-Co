import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorFeedback from '../ErrorFeedback';

describe('<ErrorFeedback />', () => {
    test('should display error', async () => {
        const errors = ['error'];

        render(<ErrorFeedback validationAndSubmissionResult={{ Ok: false, Err: errors }} />);

        expect(screen.getByRole('alert')).toHaveTextContent('error');
    });
});
