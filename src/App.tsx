import './App.css';

function App() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <header className="flex justify-center py-6 text-xl text-gray-600 font-bold border-b border-b-gray-400">
                <span>BROCCOLI & CO.</span>
            </header>
            <body className="flex-1 flex flex-col justify-center items-center gap-6 text-gray-500">
                <span className="text-4xl font-bold text-center">
                    A better way,
                    <br />
                    to enjoy every day.
                </span>
                <span className="text-center">Be the first to know when we launch.</span>
                <button className="border border-gray-500 py-3 px-6 text-md">
                    Request an invite
                </button>
            </body>
            <footer className="flex flex-col items-center py-3 text-sm text-gray-400 italic border-t border-t-gray-400">
                <span>Made with ♥ in Shanghai</span>
                <span>© 2022 Broccoli & Co. All rights reserved.</span>
            </footer>
        </div>
    );
}

export default App;
