import { ValidationResult } from './validatorFactory';

export type MergedValidationResult<T extends string> =
    | { Ok: true }
    | { Ok: false; Err: Partial<Record<T, string[]>> };

const mergeValidationResults = <T extends string>(
    validationResults: Record<T, ValidationResult>,
): MergedValidationResult<T> => {
    if (Object.values<ValidationResult>(validationResults).every(({ Ok }) => Ok)) {
        return { Ok: true };
    }

    const mergedResultErr = {} as Partial<Record<T, string[]>>;

    Object.entries<ValidationResult>(validationResults).forEach(([key, result]) => {
        if (!result.Ok) {
            mergedResultErr[key as T] = result.Err;
        }
    });

    return { Ok: false, Err: mergedResultErr };
};

export default mergeValidationResults;
