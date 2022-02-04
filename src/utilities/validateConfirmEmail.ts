import { ValidationResult } from './validatorFactory';

const validateConfirmEmail = (email: string, confirmEmail: string): ValidationResult => {
    switch (email === confirmEmail) {
        case true:
            return { Ok: true };
        case false:
            return { Ok: false, Err: ["Email and confirm email don't match."] };
    }
};

export default validateConfirmEmail;
