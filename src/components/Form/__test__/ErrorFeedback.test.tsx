import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorFeedback from '../ErrorFeedback';

describe('<ErrorFeedback />', () => {
    test('should display error', async () => {
        render(<ErrorFeedback validationAndSubmissionResult={{ Ok: false, Err: ['errors'] }} />);

        expect(screen.getByRole('alert')).toHaveTextContent('error');
    });

    test('should not display error', async () => {
        render(<ErrorFeedback validationAndSubmissionResult={{ Ok: true }} />);

        expect(screen.getByRole('alert')).toBeEmptyDOMElement();
    });
});
