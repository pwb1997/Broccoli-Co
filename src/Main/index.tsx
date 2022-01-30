import { useState } from 'react';
import RequestInviteModal from '../RequestInviteModal';

const Main = () => {
    const [requestInviteModalVisible, setRequestInviteModalVisible] = useState(false);

    const showRequestInviteModal = () => {
        setRequestInviteModalVisible(true);
    };

    const hideRequestInviteModal = () => {
        setRequestInviteModalVisible(false);
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 gap-6 text-gray-500">
            <span className="text-4xl font-bold text-center">
                A better way,
                <br />
                to enjoy every day.
            </span>
            <span className="text-center">Be the first to know when we launch.</span>
            <button
                className="px-6 py-3 border border-gray-500 text-md"
                onClick={showRequestInviteModal}
            >
                Request an invite
            </button>
            <RequestInviteModal
                isVisible={requestInviteModalVisible}
                hide={hideRequestInviteModal}
            />
        </main>
    );
};

export default Main;
