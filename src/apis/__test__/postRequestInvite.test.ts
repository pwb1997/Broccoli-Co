import { ServerError } from '../../utilities/handleApiError';
import postRequestInvite from '../postRequestInvite';

const mockPayloadToResolve = {
    name: 'test',
    email: 'test@example.com',
};

const mockPayloadToReject = {
    name: 'test',
    email: 'usedemail@airwallex.com',
};

describe('apis/postRequestInvite', () => {
    test('should resolve', async () => {
        await expect(postRequestInvite(mockPayloadToResolve)).resolves.not.toThrow();
    });

    test('should throw ServerError', async () => {
        await expect(postRequestInvite(mockPayloadToReject)).rejects.toThrowError(ServerError);
    });
});
