import { useState } from 'react';

interface RequestStageProps {
    onSuccess: () => void;
}

const RequestStage = ({ onSuccess }: RequestStageProps) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [errorMsg] = useState('this is an error');

    const submitRequest = () => {
        onSuccess();
    };

    const inputClassName = 'px-4 py-2 w-full border border-black';

    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <span className="text-2xl italic font-bold text-gray-500">Request an invite</span>
            <div className="w-8 border-t border-gray-500" />
            <form
                className="flex flex-col items-center flex-1 w-full"
                onSubmit={() => submitRequest()}
            >
                <div className="flex flex-col justify-center flex-1 w-full gap-4">
                    <input
                        className={inputClassName}
                        placeholder="Full name"
                        type="text"
                        value={fullName}
                        onChange={(ev) => setFullName(ev.target.value)}
                    />
                    <input
                        className={inputClassName}
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        className={inputClassName}
                        placeholder="Confirm email"
                        type="text"
                        value={confirmEmail}
                        onChange={(ev) => setConfirmEmail(ev.target.value)}
                    />
                </div>
                <button
                    className="w-full px-4 py-2 mt-12 text-sm font-bold text-gray-500 border border-gray-500"
                    type="submit"
                >
                    Send
                </button>
                <div className="flex items-center justify-center h-8 text-sm font-bold text-gray-500 ">
                    {errorMsg}
                </div>
            </form>
        </div>
    );
};

export default RequestStage;
