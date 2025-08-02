import LightRays from '@/components/light-rays';
import NavBar from '@/components/nav-bar';

export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <div className="flex min-h-screen bg-black text-[#1b1b18] justify-center">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
                        className="custom-rays"
                    />
                </div>
            </div>
        </>
    );
}
