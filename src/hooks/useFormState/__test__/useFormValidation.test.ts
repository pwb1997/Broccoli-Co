import { act, renderHook } from '@testing-library/react-hooks';
import { FormValidationResult } from '../../../components/Form';
import useFormValidation from '../useFormValidation';

describe('hooks/useFormState/useFormValidation', () => {
    test('should trigger validate function', async () => {
        const handleValidation = jest.fn();

        const onValidate = (): FormValidationResult<string> => {
            handleValidation();
            return { Ok: true };
        };

        const { result } = renderHook(() => useFormValidation({}, onValidate));

        const [, validateForm] = result.current;

        act(() => {
            validateForm();
        });

        expect(handleValidation).toBeCalled();
    });

    test('should update submission result', async () => {
        const validationResult: FormValidationResult<string> = {
            Ok: false,
            Err: { a: ['a'], b: ['b'] },
        };

        const onValidate = () => ({ ...validationResult });

        const { result } = renderHook(() => useFormValidation({}, onValidate));

        const [, validateForm] = result.current;

        act(() => {
            validateForm();
        });

        expect(result.current[0]).toStrictEqual(validationResult);
    });
});
