import { AT_LEAST_THREE_REGEXP, START_WITH_LETTER_REGEXP } from '../../constants/regExps';
import validatorFactory, { ValidationResult } from '../validatorFactory';

const testCases: {
    validatorOptions: { regExp: RegExp; errorMsg: string }[];
    validatorTestCases: [string, ValidationResult][];
}[] = [
    {
        validatorOptions: [
            { regExp: /abc/, errorMsg: 'abc' },
            { regExp: /abcd/, errorMsg: 'abcd' },
        ],
        validatorTestCases: [
            ['abcd', { Ok: true }],
            ['abc', { Ok: false, Err: ['abcd'] }],
            ['bcd', { Ok: false, Err: ['abc', 'abcd'] }],
        ],
    },
    {
        validatorOptions: [
            { regExp: AT_LEAST_THREE_REGEXP, errorMsg: 'at least 3' },
            { regExp: START_WITH_LETTER_REGEXP, errorMsg: 'start with letter' },
        ],
        validatorTestCases: [
            ['abcd', { Ok: true }],
            ['ab', { Ok: false, Err: ['at least 3'] }],
            ['1abc', { Ok: false, Err: ['start with letter'] }],
            ['1a', { Ok: false, Err: ['at least 3', 'start with letter'] }],
        ],
    },
];

describe('utilities/validatorFactory', () => {
    test('should generate validator', async () => {
        testCases.forEach(({ validatorOptions, validatorTestCases }) => {
            const validator = validatorFactory(validatorOptions);

            validatorTestCases.forEach(([test, result]) => {
                expect(validator(test)).toStrictEqual(result);
            });
        });
    });
});
