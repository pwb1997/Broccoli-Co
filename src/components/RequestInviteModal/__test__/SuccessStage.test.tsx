import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SuccessStage from '../SuccessStage';

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

    test('clicking OK should trigger event', async () => {
        const handleOk = jest.fn();

        const onOk = () => {
            handleOk();
        };

        render(<SuccessStage {...{ onOk }} />);

        fireEvent.click(screen.getByRole('button'));

        expect(handleOk).toBeCalled();
    });
});
