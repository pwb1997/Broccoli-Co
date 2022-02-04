import { EMAIL_REGEXP } from '../constants/regExps';
import validatorFactory from './validatorFactory';

const validateEmail = validatorFactory([
    {
        regExp: EMAIL_REGEXP,
        errorMsg: 'Invalid email address.',
    },
]);

export default validateEmail;
