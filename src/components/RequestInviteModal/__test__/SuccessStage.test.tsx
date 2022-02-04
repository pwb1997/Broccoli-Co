import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SuccessStage from '../SuccessStage';
import userEvent from '@testing-library/user-event';

describe('<SuccessStage />', () => {
    test('should display success message', async () => {
        render(
            <SuccessStage
                onOk={() => {
                    //
                }}
            />,
        );

        expect(screen.getByText(/all done/i)).toBeInTheDocument();
    });

    test('should trigger onOk', async () => {
        const handleOk = jest.fn();

        const onOk = () => {
            handleOk();
        };

        render(<SuccessStage {...{ onOk }} />);

        userEvent.click(screen.getByRole('button', { name: /ok/i }));

        expect(handleOk).toBeCalled();
    });
});
