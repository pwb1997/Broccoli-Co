import axios, { AxiosError } from 'axios';

export interface RequestInvitePayload {
    name: string;
    email: string;
}

export const postRequestInvite = async (payload: RequestInvitePayload) => {
    try {
        await axios.post(
            'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
            payload,
        );
    } catch (error) {
        const axiosError = error as AxiosError;

        throw new Error(axiosError.message);
    }
};

export default postRequestInvite;
