import { ValidationResult } from '../validatorFactory';
import validateEmail from '../validateEmail';

const testCases: [string, ValidationResult][] = [
    ['wrongemail@', { Ok: false, Err: ['Invalid email address.'] }],
    ['wrongemail@email', { Ok: false, Err: ['Invalid email address.'] }],
    ['wrongemail@email.c0m', { Ok: false, Err: ['Invalid email address.'] }],
    ['correctemail@email.com', { Ok: true }],
];

describe('utilities/validateEmail', () => {
    test('should validate email', async () => {
        testCases.forEach(([test, result]) => {
            expect(validateEmail(test)).toStrictEqual(result);
        });
    });
});
