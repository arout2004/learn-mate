const DownloadSection = () => {
    return (
        <section className="bg-green-500 my-10 h-72 relative ">
            <div className="shape-1 absolute w-560 h-560 border border-solid border-white border-opacity-15 rounded-full left-70 bottom-85"></div>
            <div className="shape-2 absolute"></div>
            <div className="shape-3 absolute"></div>
            <div className="shape-4 absolute"></div>

            <div className="mx-auto flex justify-around items-center h-full">
                <div className="">
                    <h5 className="text-white text-2xl font-bold">Ready to start?</h5>
                    <h2 className="text-white text-3xl font-bold mt-2">
                        Download our mobile app <br /> for easy course enrollment.
                    </h2>
                </div>

                <img
                    className="absolute  right-[43%]  top-7  transform translate-x-1/2 translate-y-full"
                    src="shape-14.webp"
                    alt="Shape"
                />

                <div className="mt-10 flex items-center space-x-4">
                    <a href="#">
                        <img src="google-play.webp" alt="Google Play" className="shadow-xl bg-white p-2 rounded-full"
                            style={{ boxShadow: '4px 4px 4px 9px grey' }} />
                    </a>
                    <a href="#">
                        <img src="app-store.webp" alt="App Store"
                            className="shadow-xl bg-white p-2 rounded-full"

                            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
