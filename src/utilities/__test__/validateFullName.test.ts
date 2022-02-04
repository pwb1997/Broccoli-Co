import { ValidationResult } from '../validatorFactory';
import validateFullName from '../validateFullName';

const testCases: [string, ValidationResult][] = [
    ['abcd', { Ok: true }],
    ['ab', { Ok: false, Err: ['Full name needs to be at least 3 characters long.'] }],
    ['1abc', { Ok: false, Err: ['Full name must start with a letter.'] }],
    [
        '1a',
        {
            Ok: false,
            Err: [
                'Full name needs to be at least 3 characters long.',
                'Full name must start with a letter.',
            ],
        },
    ],
];

describe('utilities/validateFullName', () => {
    test('should validate fullName', async () => {
        testCases.forEach(([test, result]) => {
            expect(validateFullName(test)).toStrictEqual(result);
        });
    });
});
