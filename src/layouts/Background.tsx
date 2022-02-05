const Background = () => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen -z-10">
            <div className="absolute w-full h-full backdrop-blur-sm backdrop-brightness-125" />
            <video
                data-testid="backgroundVideo"
                className="object-cover min-w-full min-h-full"
                playsInline
                autoPlay
                muted
                loop
            >
                <source src="./background.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default Background;
