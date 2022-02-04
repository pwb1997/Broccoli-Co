import { FormSubmissionResult } from '../../components/Form';
import { ServerError } from '../handleApiError';
import wrapFormRequest from '../wrapFormRequest';

const mockSuccess = () => new Promise((res) => setTimeout(res, 1));

const mockServerError = () =>
    new Promise((_, rej) => setTimeout(() => rej(new ServerError('error')), 1));

const mockUnhandledError = () =>
    new Promise((_, rej) =>
        setTimeout(() => {
            rej(new Error('unhandled'));
        }, 1),
    );

const mockOnSuccess = () => {
    //
};

const handledTestCases: [() => Promise<unknown>, FormSubmissionResult][] = [
    [mockSuccess, { Ok: true }],
    [mockServerError, { Ok: false, Err: 'error' }],
];

const unhandledTestCases: (() => Promise<unknown>)[] = [mockUnhandledError];

describe('utilities/wrapFormRequest', () => {
    test('wrapped request should resolve', async () => {
        await Promise.all(
            handledTestCases.map(async ([test, result]) =>
                expect(wrapFormRequest(test, mockOnSuccess)()).resolves.toStrictEqual(result),
            ),
        );
    });

    test('wrapped request should throw', async () => {
        await Promise.all(
            unhandledTestCases.map(async (test) =>
                expect(wrapFormRequest(test, mockOnSuccess)()).rejects.toThrow(),
            ),
        );
    });

    test('wrapped request should trigger on success', async () => {
        const handleOnSuccess = jest.fn();

        await wrapFormRequest(mockSuccess, () => {
            handleOnSuccess();
        })();

        expect(handleOnSuccess).toBeCalled();
    });
});
