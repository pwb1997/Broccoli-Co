import { AxiosError } from 'axios';

export class ServerError extends Error {
    name = 'ServerError';

    constructor(message: string) {
        super(message);
    }
}

const handleApiError = (error: unknown) => {
    const apiError = error as AxiosError;

    throw new ServerError(apiError.message);
};

export default handleApiError;
