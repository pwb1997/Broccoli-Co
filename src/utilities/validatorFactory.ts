export interface ValidatorFactoryRule {
    regExp: RegExp;
    errorMsg: string;
}

export type ValidationResult = { Ok: true } | { Ok: false; Err: string[] };

export const validatorFactory =
    (rules: ValidatorFactoryRule[]) =>
    (str: string): ValidationResult => {
        const errorMsgs = rules
            .filter(({ regExp }) => !regExp.test(str))
            .map(({ errorMsg }) => errorMsg);

        switch (errorMsgs.length) {
            case 0:
                return { Ok: true };
            default:
                return { Ok: false, Err: errorMsgs };
        }
    };

export default validatorFactory;
