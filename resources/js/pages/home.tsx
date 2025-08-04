import LightRays from '@/components/light-rays';
import NavBar from '@/components/nav-bar';

export default function Home() {
    return (
        <div className="relative">
            <div style={{ width: '100%', height: '100%', position: 'fixed', zIndex: '0' }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="relative"
                />
            </div>

            <div className="container relative z-10 px-3 py-16 mx-auto">
                <NavBar />

                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                                Best place to choose <br /> your <span className="text-blue-500">clothes</span>
                            </h1>

                            <p className="mt-3 mb-3 text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.
                            </p>

                            <a
                                href={'/products'}
                                className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img
                            className="w-full h-full lg:max-w-3xl"
                            src="https://merakiui.com/images/components/Catalogue-pana.svg"
                            alt="Catalogue-pana.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
