import 'ts-jest';
import mergeValidationResults, { MergedValidationResult } from '../mergeValidationResults';
import { ValidationResult } from '../validatorFactory';

const testCases: [Record<string, ValidationResult>, MergedValidationResult<string>][] = [
    [{ a: { Ok: true }, b: { Ok: true }, c: { Ok: true } }, { Ok: true }],
    [{ a: { Ok: false, Err: ['a'] } }, { Ok: false, Err: { a: ['a'] } }],
    [
        { a: { Ok: false, Err: ['a'] }, b: { Ok: false, Err: ['b'] } },
        { Ok: false, Err: { a: ['a'], b: ['b'] } },
    ],
    [
        {
            a: { Ok: false, Err: ['a'] },
            b: { Ok: false, Err: ['b'] },
            c: { Ok: false, Err: ['c'] },
        },
        { Ok: false, Err: { a: ['a'], b: ['b'], c: ['c'] } },
    ],
    [
        {
            a: { Ok: false, Err: ['a'] },
            b: { Ok: true },
            c: { Ok: false, Err: ['c'] },
        },
        { Ok: false, Err: { a: ['a'], c: ['c'] } },
    ],
];

describe('utilities/mergeValidationResults', () => {
    test('should merge validation results', async () => {
        testCases.forEach(([validationResults, mergedValidationResult]) => {
            expect(mergeValidationResults(validationResults)).toStrictEqual(mergedValidationResult);
        });
    });
});
