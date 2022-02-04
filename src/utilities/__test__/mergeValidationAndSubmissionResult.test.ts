import {
    FormSubmissionResult,
    FormValidationAndSubmissionResult,
    FormValidationResult,
} from '../../components/Form';
import mergeValidationAndSubmissionResult from '../mergeValidationAndSubmissionResult';

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
        { Ok: false, Err: ['a', 'b'] },
    ],
];

describe('utilities/mergeValidationAndSubmissionResult', () => {
    test('should mergeValidationAndSubmissionResult', async () => {
        testCases.forEach(([test, result]) => {
            expect(mergeValidationAndSubmissionResult(...test)).toStrictEqual(result);
        });
    });
});
