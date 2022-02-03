import { useState } from 'react';
import { FormProps, FormValidationResult } from '../../components/Form';

const useFormValidation = <T extends string>(
    inputValues: Record<T, string>,
    onValidate: FormProps<T>['onValidate'],
) => {
    const [validationResult, setValidationResult] = useState<FormValidationResult<T>>({
        Ok: true,
    });

    const validateForm = () => {
        const result = onValidate(inputValues);
        setValidationResult(result);

        return result.Ok;
    };

    return [validationResult, validateForm] as const;
};

export default useFormValidation;
