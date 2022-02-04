import {
    AT_LEAST_THREE_REGEXP,
    START_WITH_LETTER_REGEXP,
    VALID_CHARS_REGEXP,
} from '../constants/regExps';
import validatorFactory from './validatorFactory';

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

export default validateFullName;
