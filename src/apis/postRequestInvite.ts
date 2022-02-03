import axios from 'axios';
import handleApiError from '../utilities/handleApiError';
import { REQUEST_INVITE_API } from '../constants/endpoints';

export interface RequestInvitePayload {
    name: string;
    email: string;
}

export const postRequestInvite = async (payload: RequestInvitePayload) => {
    await axios.post(REQUEST_INVITE_API, payload).catch((error) => handleApiError(error));
};

export default postRequestInvite;
