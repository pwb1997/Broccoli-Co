import { act, renderHook } from '@testing-library/react-hooks';
import { FormValidationResult } from '../../../components/Form';
import useFieldHighlights from '../useFieldHighlights';
import { useState } from 'react';

describe('hooks/useFormState/useFieldHighlights', () => {
    test('should contain all fields', async () => {
        const fields = ['a', 'b', 'c'];

        const {
            result: {
                current: [validationResult],
            },
        } = renderHook(() => useState<FormValidationResult<string>>({ Ok: true }));

        const { result } = renderHook(() => useFieldHighlights(fields, validationResult));

        expect(result.current[0]).toStrictEqual({ a: false, b: false, c: false });
    });

    test('field highlight should be true if on error', async () => {
        const fields = ['a', 'b', 'c'];

        const {
            result: {
                current: [validationResult],
            },
        } = renderHook(() =>
            useState<FormValidationResult<string>>({
                Ok: false,
                Err: {
                    a: ['a'],
                    b: ['b'],
                },
            }),
        );

        const { result } = renderHook(() => useFieldHighlights(fields, validationResult));

        expect(result.current[0].a).toBe(true);
        expect(result.current[0].b).toBe(true);
    });

    test('field highlight should be false if not on error', async () => {
        const fields = ['a', 'b', 'c'];

        const {
            result: {
                current: [validationResult],
            },
        } = renderHook(() =>
            useState<FormValidationResult<string>>({
                Ok: false,
                Err: {
                    a: ['a'],
                    b: ['b'],
                },
            }),
        );

        const { result } = renderHook(() => useFieldHighlights(fields, validationResult));

        expect(result.current[0].c).toBe(false);
    });

    test('field highlight should be false if removed', async () => {
        const fields = ['a', 'b', 'c'];

        const {
            result: {
                current: [validationResult],
            },
        } = renderHook(() =>
            useState<FormValidationResult<string>>({
                Ok: false,
                Err: {
                    a: ['a'],
                    b: ['b'],
                },
            }),
        );

        const { result } = renderHook(() => useFieldHighlights(fields, validationResult));

        const [, removeFieldHighlight] = result.current;

        act(() => removeFieldHighlight('a'));

        expect(result.current[0].a).toBe(false);
    });
});
