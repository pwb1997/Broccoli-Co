import { useState } from 'react';

const useFormInputs = <T extends string>(fieldNames: readonly T[]) => {
    const initialInputValues = Object.fromEntries(fieldNames.map((name) => [name, ''])) as Record<
        T,
        string
    >;

    const [inputValues, setInputValues] = useState({ ...initialInputValues });

    const setInputValue = (fieldName: T, value: string) =>
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });

    return [inputValues, setInputValue] as const;
};

export default useFormInputs;
