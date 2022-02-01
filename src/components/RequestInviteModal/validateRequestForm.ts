import atLeastThreeChars from '../../regExps/atLeastThreeChars';
import email from '../../regExps/email';
import startWithLetter from '../../regExps/startWithLetter';
import validChars from '../../regExps/validChars';
import mergeValidationResults from '../../utilities/mergeValidationResults';
import validatorFactory, { ValidationResult } from '../../utilities/validatorFactory';

const validateFullName = validatorFactory([
    { regExp: atLeastThreeChars, errorMsg: 'Full name needs to be at least 3 characters long.' },
    {
        regExp: validChars,
        errorMsg: 'Full name should only contain letters, numbers, underscores or hyphens.',
    },
    {
        regExp: startWithLetter,
        errorMsg: 'Full name must start with a letter.',
    },
]);

const validateEmail = validatorFactory([
    {
        regExp: email,
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
