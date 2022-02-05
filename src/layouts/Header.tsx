const Header = () => (
    <header className="flex flex-row items-end justify-between py-5 pl-[10%] from-cyan-500/40 bg-gradient-to-tl to-pink-500/40 backdrop-blur-md">
        <div className="flex flex-col font-mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-pink-500">
            <span>BROCCOLI</span>
            <span>& CO.</span>
        </div>
        <div className="px-2 bg-black border-l-8 border-pink-500">
            <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-pink-500">
                ♥ broccoli
            </span>
        </div>
    </header>
);

export default Header;
