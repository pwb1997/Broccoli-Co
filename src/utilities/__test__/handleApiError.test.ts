import handleApiError, { ServerError } from '../handleApiError';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('utilities/handleApiError', () => {
    test('should throw ServerError', async () => {
        mockedAxios.post.mockRejectedValueOnce({ message: 'request failed' });

        await expect(axios.post('', {}).catch(handleApiError)).rejects.toThrow(
            new ServerError('request failed'),
        );
    });
});
