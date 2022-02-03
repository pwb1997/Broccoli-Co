import { act, renderHook } from '@testing-library/react-hooks';
import useFormInputs from '../useFormInputs';

describe('hooks/useFormState/useFormInputs', () => {
    test('should contain all fields', async () => {
        const fields = ['a', 'b', 'c'];

        const { result } = renderHook(() => useFormInputs(fields));

        expect(result.current[0]).toStrictEqual({ a: '', b: '', c: '' });
    });

    test('should update field', async () => {
        const fields = ['a', 'b', 'c'];

        const { result } = renderHook(() => useFormInputs(fields));

        const [, setInputValue] = result.current;

        act(() => setInputValue('a', 'new value'));

        expect(result.current[0]).toStrictEqual({ a: 'new value', b: '', c: '' });
    });
});
