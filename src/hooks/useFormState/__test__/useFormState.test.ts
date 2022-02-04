import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useFormState from '..';

const mockRequest = () => new Promise((res) => setTimeout(res));

describe('Form/useFormState', () => {
    test('should contain input values', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => ({ Ok: true }),
                () => ({ Ok: true }),
            ),
        );

        expect(Object.keys(result.current[0].inputValues)).toStrictEqual(fields);
    });

    test('should contain input highlights', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => ({ Ok: true }),
                () => ({ Ok: true }),
            ),
        );

        expect(Object.keys(result.current[0].fieldHighlights)).toStrictEqual(fields);
    });

    test('should contain submitting', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => ({ Ok: true }),
                () => ({ Ok: true }),
            ),
        );

        expect(result.current[0].submitting).toBe(false);
    });

    test('should update submitting', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => ({ Ok: true }),
                async () => {
                    await mockRequest();
                    return { Ok: true };
                },
            ),
        );

        act(() => {
            result.current[1].submitForm();
        });

        expect(result.current[0].submitting).toBe(true);
    });

    test('should update input value', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => ({ Ok: true }),
                () => ({ Ok: true }),
            ),
        );

        act(() => {
            result.current[1].setInputValue('field1', 'new value');
        });

        expect(result.current[0].inputValues['field1']).toBe('new value');
    });

    test('should update input highlight on validation error', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => {
                    return {
                        Ok: false,
                        Err: { field1: ['field1 error'], field3: ['field3 error'] },
                    };
                },
                () => ({ Ok: true }),
            ),
        );

        act(() => {
            result.current[1].validateForm();
        });

        expect(result.current[0].fieldHighlights).toStrictEqual({
            field1: true,
            field2: false,
            field3: true,
        });
    });

    test('should remove input highlight', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => {
                    return {
                        Ok: false,
                        Err: { field1: ['field1 error'] },
                    };
                },
                () => ({ Ok: true }),
            ),
        );

        act(() => {
            result.current[1].validateForm();
        });

        act(() => {
            result.current[1].removeFieldHighlight('field1');
        });

        expect(result.current[0].fieldHighlights.field1).toBe(false);
    });

    test('should update validationAndSubmissionResult on error', async () => {
        const fields = ['field1', 'field2', 'field3'] as const;

        const { result } = renderHook(() =>
            useFormState(
                fields,
                () => {
                    return {
                        Ok: false,
                        Err: { field1: ['field1 error'], field3: ['field3 error'] },
                    };
                },
                () => ({ Ok: true }),
            ),
        );

        act(() => {
            result.current[1].validateForm() && result.current[1].submitForm();
        });

        expect(result.current[0].validationAndSubmissionResult).toStrictEqual({
            Ok: false,
            Err: ['field1 error', 'field3 error'],
        });
    });
});
