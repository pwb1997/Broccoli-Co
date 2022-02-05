const Footer = () => {
    return (
        <footer className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col gap-1 py-3 italic font-bold text-white">
                <span className="px-4 py-1 text-sm max-w-fit from-green-900/50 bg-gradient-to-l to-slate-900/30 backdrop-blur-md whitespace-nowrap">
                    Made with ♥ in Shanghai
                </span>
                <span className="px-3 py-1 text-xs max-w-fit from-green-900/50 bg-gradient-to-r to-violet-900/30 backdrop-blur-md whitespace-nowrap">
                    © 2022 Broccoli & Co. All rights reserved.
                </span>
            </div>
            <div className="flex flex-row items-center gap-0.5 px-3 backdrop-blur-md from-green-900/50 bg-gradient-to-l to-slate-900/30">
                <span className="w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
                <span className="py-1 text-xl text-white max-w-fit whitespace-nowrap">n air</span>
            </div>
        </footer>
    );
};

export default Footer;
