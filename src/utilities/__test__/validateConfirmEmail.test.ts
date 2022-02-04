import { ValidationResult } from '../validatorFactory';
import validateConfirmEmail from '../validateConfirmEmail';

const testCases: [[string, string], ValidationResult][] = [
    [['user1@email.com', 'user1@email.com'], { Ok: true }],
    [
        ['user1@email.com', 'user2@email.com'],
        { Ok: false, Err: ["Email and confirm email don't match."] },
    ],
];

describe('utilities/validateConfirmEmail', () => {
    test('should validate confirmEmail', async () => {
        testCases.forEach(([test, result]) => {
            expect(validateConfirmEmail(...test)).toStrictEqual(result);
        });
    });
});
