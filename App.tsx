
import React, { useState, useCallback } from 'react';
import { GameBoyScreen } from './components/GameBoyScreen';
import { PraiseButton } from './components/PraiseButton';
import { PRAISE_MESSAGES } from './constants/praiseMessages';

const DPad: React.FC = () => (
    <div className="relative w-24 h-24 select-none">
        <div className="absolute w-8 h-24 top-0 left-8 bg-gray-800 rounded-md shadow-md"></div>
        <div className="absolute w-24 h-8 top-8 left-0 bg-gray-800 rounded-md shadow-md"></div>
        <div className="absolute w-10 h-10 top-7 left-7 border-4 border-gray-800 rounded-full"></div>
    </div>
);

const SystemButtons: React.FC = () => (
    <div className="flex justify-center items-center space-x-6 mt-8 -rotate-12">
        <div className="flex flex-col items-center">
            <div className="w-12 h-5 bg-gray-700 rounded-full shadow-inner"></div>
            <p className="text-xs font-bold text-gray-700 mt-1 select-none">SELECT</p>
        </div>
        <div className="flex flex-col items-center">
            <div className="w-12 h-5 bg-gray-700 rounded-full shadow-inner"></div>
            <p className="text-xs font-bold text-gray-700 mt-1 select-none">START</p>
        </div>
    </div>
);

const App: React.FC = () => {
    const [currentPraise, setCurrentPraise] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePickPraise = useCallback(() => {
        if (isLoading) return;

        setIsLoading(true);
        setCurrentPraise(null);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * PRAISE_MESSAGES.length);
            setCurrentPraise(PRAISE_MESSAGES[randomIndex]);
            setIsLoading(false);
        }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center p-4 font-sans">
            <main className="w-full max-w-sm bg-stone-300 rounded-2xl rounded-b-[4rem] p-4 shadow-2xl border-2 border-stone-400">
                <GameBoyScreen message={currentPraise} isLoading={isLoading} />
                
                <div className="relative px-4 pt-8 pb-4">
                    <div className="absolute -top-4 right-6">
                        <h1 className="text-4xl font-extrabold text-blue-700" style={{ fontFamily: 'monospace', textShadow: "2px 2px #a0a0a0" }}>
                            PraiseBoy
                        </h1>
                        <p className="text-xs text-blue-900/80 font-bold text-right -mt-1">DIGITAL</p>
                    </div>

                    <div className="flex justify-between items-center mt-12">
                        <div className="w-1/3 flex justify-center">
                            <DPad />
                        </div>

                        <div className="w-2/3 flex justify-end items-center space-x-6">
                           <PraiseButton onClick={handlePickPraise} disabled={isLoading} />
                           <div className="self-end mb-2">
                            <div className="w-16 h-16 bg-rose-800 rounded-full shadow-lg flex items-center justify-center">
                               <span className="text-white text-2xl font-bold font-sans select-none">B</span>
                            </div>
                           </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <SystemButtons />
                    </div>

                    <div className="text-center mt-8 text-sm font-mono text-gray-600">
                        <p>오늘의 칭찬 주인공 뽑기</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
