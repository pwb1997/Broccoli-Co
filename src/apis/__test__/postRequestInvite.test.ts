import { ServerError } from '../../utilities/handleApiError';
import axios from 'axios';
import postRequestInvite from '../postRequestInvite';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('apis/postRequestInvite', () => {
    test('should resolve', async () => {
        mockedAxios.post.mockResolvedValueOnce('OK');

        await expect(postRequestInvite({ name: '', email: '' })).resolves.not.toThrow();
    });

    test('should throw ServerError', async () => {
        mockedAxios.post.mockRejectedValueOnce({ message: 'request failed' });

        await expect(postRequestInvite({ name: '', email: '' })).rejects.toThrow(
            new ServerError('request failed'),
        );
    });
});
