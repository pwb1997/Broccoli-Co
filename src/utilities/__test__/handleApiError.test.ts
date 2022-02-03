import axios from 'axios';
import { REQUEST_INVITE_API } from '../../constants/endpoints';
import handleApiError, { ServerError } from '../handleApiError';

const mockPayloadToReject = { name: 'test', email: 'usedemail@airwallex.com' };

describe('utilities/handleApiError', () => {
    test('should throw ServerError', async () => {
        await expect(
            axios.post(REQUEST_INVITE_API, mockPayloadToReject).catch(handleApiError),
        ).rejects.toThrowError(ServerError);
    });
});
