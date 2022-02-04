import { useEffect, useState } from 'react';
import { FormValidationResult } from '../../components/Form';

const useFieldHighlights = <T extends string>(
    fieldNames: readonly T[],
    validationResult: FormValidationResult<T>,
) => {
    const initialInputHighlights = Object.fromEntries(
        fieldNames.map((name) => [name, false]),
    ) as Record<T, boolean>;

    const [fieldHighlight, setInputHighlights] = useState({ ...initialInputHighlights });

    useEffect(() => {
        const newInputHighlights = { ...initialInputHighlights };

        if (!validationResult.Ok) {
            Object.keys(validationResult.Err).forEach((key) => {
                newInputHighlights[key as T] = true;
            });
        }

        setInputHighlights(newInputHighlights);
    }, [validationResult]);

    const removeFieldHighlight = (fieldName: T) =>
        setInputHighlights({
            ...fieldHighlight,
            [fieldName]: false,
        });

    return [fieldHighlight, removeFieldHighlight] as const;
};

export default useFieldHighlights;
