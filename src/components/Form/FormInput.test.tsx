import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import FormInput from './FormInput';

const FormInputInstance = ({ defaultHighlight }: { defaultHighlight: boolean }) => {
    const [value, setValue] = useState('default');
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
        render(<FormInputInstance defaultHighlight={false} />);

        expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
    });

    test('value should be default', async () => {
        render(<FormInputInstance defaultHighlight={false} />);

        expect(screen.getByRole('textbox')).toHaveValue('default');
    });

    test('value should be changed on input', async () => {
        render(<FormInputInstance defaultHighlight={false} />);

        fireEvent.input(screen.getByRole('textbox'), { target: { value: 'new' } });

        expect(screen.getByRole('textbox')).toHaveValue('new');
    });

    test('border should be highlighted', async () => {
        render(<FormInputInstance defaultHighlight={true} />);

        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });

    test('border highlight should be removed on value change', async () => {
        render(<FormInputInstance defaultHighlight={true} />);

        fireEvent.input(screen.getByRole('textbox'), { target: { value: '' } });

        expect(screen.getByRole('textbox')).not.toHaveClass('border-red-500');
    });
});
