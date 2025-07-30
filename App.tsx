import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SparklesIcon, PhotoIcon, PencilIcon } from './components/Icons';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [transformedText, setTransformedText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransform = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl('');
    setTransformedText('');

    try {
      const generatedImageUrl = await generateImage(inputText);
      setImageUrl(generatedImageUrl);
      setTransformedText(inputText);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
            디지털 칠판
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            텍스트를 그림과 손글씨로 변환하여 생동감 있는 학습 자료를 만들어 보세요.
          </p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="relative">
               <PencilIcon className="absolute top-3 left-3 w-6 h-6 text-gray-400" />
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="여기에 내용을 입력하세요. 예: '우주를 여행하는 용감한 고양이'"
                className="w-full h-32 p-4 pl-11 text-base text-gray-700 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 resize-none"
                rows={4}
              />
            </div>
            <button
              onClick={handleTransform}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>변환 중...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>변환하기</span>
                </>
              )}
            </button>
          </div>
          
          {error && <div className="mt-6 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

          <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <PhotoIcon className="w-16 h-16 text-gray-300 animate-pulse mb-4"/>
                <p className="text-lg">결과를 생성하고 있습니다...</p>
              </div>
            ) : (
              <>
                { !imageUrl && !transformedText && (
                   <div className="text-center text-gray-400 p-8 rounded-lg bg-gray-50">
                     <PhotoIcon className="w-16 h-16 mx-auto mb-4"/>
                     <h3 className="text-xl font-semibold">변환 결과</h3>
                     <p>결과물이 여기에 표시됩니다.</p>
                   </div>
                )}
                { (imageUrl || transformedText) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">관련 이미지</h3>
                      <div className="bg-gray-800 rounded-lg shadow-lg p-6 min-h-[300px] flex items-center justify-center relative aspect-square">
                        {imageUrl ? (
                          <img src={imageUrl} alt="Generated from text" className="rounded-md object-cover w-full h-full"/>
                        ) : (
                           <div className="text-center text-gray-400">
                             <PhotoIcon className="w-12 h-12 mx-auto mb-2"/>
                             <p>이미지를 불러오지 못했습니다.</p>
                           </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">손글씨 뷰</h3>
                      <div className="bg-green-800/80 p-6 rounded-lg shadow-lg min-h-[300px] flex items-center justify-center aspect-square" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
                        {transformedText && (
                          <p className="font-handwriting font-bold text-5xl sm:text-6xl text-white leading-relaxed text-center break-words">
                            {transformedText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <footer className="w-full text-center py-4">
        <p className="text-sm text-gray-500">© 2025 과학교사 박정임</p>
      </footer>
    </div>
  );
};

export default App;
