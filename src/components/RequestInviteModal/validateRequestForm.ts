import {
    AT_LEAST_THREE_REGEXP,
    EMAIL_REGEXP,
    START_WITH_LETTER_REGEXP,
    VALID_CHARS_REGEXP,
} from '../../constants/regExps';
import mergeValidationResults from '../../utilities/mergeValidationResults';
import validatorFactory, { ValidationResult } from '../../utilities/validatorFactory';

const validateFullName = validatorFactory([
    {
        regExp: AT_LEAST_THREE_REGEXP,
        errorMsg: 'Full name needs to be at least 3 characters long.',
    },
    {
        regExp: VALID_CHARS_REGEXP,
        errorMsg: 'Full name should only contain letters, numbers, underscores or hyphens.',
    },
    {
        regExp: START_WITH_LETTER_REGEXP,
        errorMsg: 'Full name must start with a letter.',
    },
]);

const validateEmail = validatorFactory([
    {
        regExp: EMAIL_REGEXP,
        errorMsg: 'Invalid email address.',
    },
]);

const validateConfirmEmail = (email: string, confirmEmail: string): ValidationResult => {
    switch (email === confirmEmail) {
        case true:
            return { Ok: true };
        case false:
            return { Ok: false, Err: ["Email and confirm email don't match."] };
    }
};

const validateRequestForm = (
    formInputVal: Record<'fullName' | 'email' | 'confirmEmail', string>,
) => {
    const validationResults = {
        fullName: validateFullName(formInputVal.fullName),
        email: validateEmail(formInputVal.email),
        confirmEmail: validateConfirmEmail(formInputVal.email, formInputVal.confirmEmail),
    };

    return mergeValidationResults(validationResults);
};

export default validateRequestForm;
