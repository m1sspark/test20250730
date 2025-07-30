
import React, { useEffect, useState } from 'react';

interface GameBoyScreenProps {
  message: string | null;
  isLoading: boolean;
}

const BlinkingCursor: React.FC = () => <span className="animate-blink">█</span>;

const LoadingAnimation: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center text-xl md:text-2xl animate-pulse">
        <p>SELECTING...</p>
    </div>
);

const InitialScreen: React.FC = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-xl md:text-2xl p-2">
        <p>오늘의 칭찬 주인공</p>
        <p className="mt-4 animate-pulse">PUSH 'A' BUTTON</p>
    </div>
);

export const GameBoyScreen: React.FC<GameBoyScreenProps> = ({ message, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!message || isLoading) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
        setDisplayedText(message.substring(0, i + 1));
        i++;
        if (i >= message.length) {
            clearInterval(typingInterval);
        }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [message, isLoading]);
  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingAnimation />;
    }
    if (message) {
      const isTypingFinished = displayedText.length === message.length;
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
          <p className="text-xl md:text-2xl leading-relaxed">{displayedText}{!isTypingFinished && <BlinkingCursor />}</p>
          {isTypingFinished && <div className="mt-4"><BlinkingCursor/></div>}
        </div>
      );
    }
    return <InitialScreen />;
  };

  return (
    <div className="bg-gray-900/70 p-4 rounded-t-lg shadow-inner">
      <div className="bg-lime-200 text-lime-900 w-full h-56 rounded-sm font-mono flex items-center justify-center relative border-2 border-gray-700 shadow-lg">
        {renderContent()}
        <div className="absolute top-2 left-2 flex items-center space-x-2">
           <div className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-red-800/50"></div>
           <span className="text-[10px] font-bold text-lime-800/70 select-none">POWER</span>
        </div>
      </div>
    </div>
  );
};
