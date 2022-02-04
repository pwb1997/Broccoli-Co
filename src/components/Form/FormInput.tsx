import { ChangeEventHandler } from 'react';
import classNames from 'classnames';

export interface FormInputProps {
    value: string;
    setValue: (val: string) => void;
    highlight: boolean;
    removeHighlight: () => void;
    placeholder: string;
}

const FormInput = ({
    value,
    setValue,
    highlight,
    removeHighlight,
    placeholder,
}: FormInputProps) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setValue(ev.target.value);
        removeHighlight();
    };

    const className = classNames({
        'w-full px-4 py-2 border': true,
        'border-red-500': highlight,
        'border-black': !highlight,
    });

    return <input type="text" {...{ className, placeholder, value, onChange }} />;
};

export default FormInput;
