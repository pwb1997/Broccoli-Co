import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormInput from '../FormInput';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

const MockFormInput = ({ defaultHighlight }: { defaultHighlight: boolean }) => {
    const [value, setValue] = useState('');
    const [highlight, setHighlight] = useState(defaultHighlight);

    return (
        <FormInput
            value={value}
            setValue={setValue}
            highlight={highlight}
            removeHighlight={() => setHighlight(false)}
            placeholder="test placeholder"
        />
    );
};

describe('<FormInput />', () => {
    test('should contain placeholder', async () => {
        render(<MockFormInput defaultHighlight={false} />);

        expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
    });

    test('should handle user input', async () => {
        render(<MockFormInput defaultHighlight={false} />);

        userEvent.type(screen.getByRole('textbox'), 'something');

        expect(screen.getByRole('textbox')).toHaveValue('something');
    });

    test('should be highlighted', async () => {
        render(<MockFormInput defaultHighlight={true} />);

        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });

    test('should remove highlight', async () => {
        render(<MockFormInput defaultHighlight={true} />);

        userEvent.type(screen.getByRole('textbox'), 'something');

        expect(screen.getByRole('textbox')).not.toHaveClass('border-red-500');
    });
});
