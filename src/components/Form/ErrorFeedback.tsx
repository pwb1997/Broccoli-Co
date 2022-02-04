import { FormValidationAndSubmissionResult } from '.';
import { compact } from 'lodash-es';

interface ErrorFeedbackProps {
    validationAndSubmissionResult: FormValidationAndSubmissionResult;
}

interface ErrorMsgProps {
    msg: string;
}

const ErrorMsg = ({ msg }: ErrorMsgProps) => {
    return (
        <div className="flex flex-row gap-2 text-sm font-bold leading-5 text-red-500 first:mt-1.5 last:mb-1.5">
            <span>*</span>
            <span>{msg}</span>
        </div>
    );
};

const ErrorFeedback = ({ validationAndSubmissionResult }: ErrorFeedbackProps) => {
    const errorMsgs = !validationAndSubmissionResult.Ok
        ? compact(validationAndSubmissionResult.Err)
        : [];

    return (
        <div
            role="alert"
            className="flex flex-col w-full gap-1 px-2 mt-6 border-l-2 border-red-500 bg-red-50"
        >
            {errorMsgs.map((errorMsg, idx) => (
                <ErrorMsg msg={errorMsg} key={idx} />
            ))}
        </div>
    );
};

export default ErrorFeedback;
