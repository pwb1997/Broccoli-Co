import { renderHook } from '@testing-library/react-hooks';
import {
    FormSubmissionResult,
    FormValidationAndSubmissionResult,
    FormValidationResult,
} from '../../../components/Form';
import useValidationAndSubmissionResult from '../useValidationAndSubmissionResult';

const testCases: [
    [FormValidationResult<string>, FormSubmissionResult],
    FormValidationAndSubmissionResult,
][] = [
    [[{ Ok: true }, { Ok: true }], { Ok: true }],
    [[{ Ok: true }, { Ok: false, Err: 'server error' }], { Ok: false, Err: ['server error'] }],
    [
        [
            { Ok: false, Err: { a: ['a'], b: ['b'] } },
            { Ok: false, Err: 'server error' },
        ],
        { Ok: false, Err: ['a', 'b', 'server error'] },
    ],
];

describe('hooks/useFormState/useValidationAndSubmissionResult', () => {
    test('should generate ValidationAndSubmissionResult', async () => {
        testCases.forEach(([input, targetResult]) => {
            const { result } = renderHook(() => useValidationAndSubmissionResult(...input));

            expect(result.current).toStrictEqual(targetResult);
        });
    });
});
