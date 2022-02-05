import RequestInviteModal from '../components/RequestInviteModal';
import { useState } from 'react';

const Main = () => {
    const [requestInviteModalVisible, setRequestInviteModalVisible] = useState(false);

    const showRequestInviteModal = () => {
        setRequestInviteModalVisible(true);
    };

    const hideRequestInviteModal = () => {
        setRequestInviteModalVisible(false);
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 gap-8">
            <div className="flex flex-col gap-1">
                <span className="pl-2 text-4xl font-bold text-white from-pink-500/75 bg-gradient-to-l to-cyan-500/75 w-fit whitespace-nowrap backdrop-blur-md">
                    A better way,
                </span>
                <span className="pl-2 text-4xl font-bold text-white from-pink-500/75 bg-gradient-to-l to-cyan-900/30 w-fit whitespace-nowrap backdrop-blur-md">
                    to enjoy every day.
                </span>
                <span className="self-end pr-0.5 pl-1 border-l-8 border-pink-300 font-light text-center text-white bg-gray-800/50 text-md w-fit whitespace-nowrap backdrop-blur-md">
                    Be the first to know when we launch :)
                </span>
            </div>
            <button
                className="px-4 py-3 bg-slate-900/80 backdrop-blur-md"
                onClick={showRequestInviteModal}
            >
                <span className="text-2xl font-bold text-transparent whitespace-nowrap bg-clip-text bg-gradient-to-br from-violet-500 to-pink-500">
                    REQUEST AN INVITE
                </span>
            </button>
            <RequestInviteModal
                isVisible={requestInviteModalVisible}
                hide={hideRequestInviteModal}
            />
        </main>
    );
};

export default Main;
