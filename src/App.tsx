import { useState } from 'react';
import './App.css';
import RequestInviteModal from './RequestInviteModal';

function App() {
    const [requestInviteModelVisible, setRequestInviteModelVisible] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen">
            <header className="flex justify-center py-6 text-xl font-bold text-gray-600 border-b border-b-gray-400">
                <span>BROCCOLI & CO.</span>
            </header>
            <section className="flex flex-col items-center justify-center flex-1 gap-6 text-gray-500">
                <span className="text-4xl font-bold text-center">
                    A better way,
                    <br />
                    to enjoy every day.
                </span>
                <span className="text-center">Be the first to know when we launch.</span>
                <button
                    className="px-6 py-3 border border-gray-500 text-md"
                    onClick={() => setRequestInviteModelVisible(true)}
                >
                    Request an invite
                </button>
            </section>
            <footer className="flex flex-col items-center py-3 text-sm italic text-gray-400 border-t border-t-gray-400">
                <span>Made with ♥ in Shanghai</span>
                <span>© 2022 Broccoli & Co. All rights reserved.</span>
            </footer>
            <RequestInviteModal
                isVisible={requestInviteModelVisible}
                hide={() => setRequestInviteModelVisible(false)}
            />
        </div>
    );
}

export default App;
