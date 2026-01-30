
import React, { useState } from 'react';
import { editPostImage, generatePostVideo } from '../services/gemini';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImageUrl?: string;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, selectedImageUrl }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'edit' | 'video'>('edit');

  if (!isOpen) return null;

  const handleProcess = async () => {
    setLoading(true);
    try {
      if (mode === 'edit' && selectedImageUrl) {
        // Simple mock for base64 conversion for demo purposes
        // In a real app, you'd fetch and convert the image to base64
        const res = await fetch(selectedImageUrl);
        const blob = await res.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          const edited = await editPostImage(base64, prompt);
          setResult(edited);
          setLoading(false);
        };
      } else if (mode === 'video') {
        const videoUrl = await generatePostVideo(prompt);
        setResult(videoUrl);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('AI Processing failed. Check your API key.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1c1c1e] w-full max-w-md rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-800">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-lg">Gemini AI Lab</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex bg-[#2c2c2e] rounded-lg p-1">
            <button 
              onClick={() => setMode('edit')}
              className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition ${mode === 'edit' ? 'bg-[#3a3a3c] text-white shadow' : 'text-gray-400'}`}
            >
              Edit Image
            </button>
            <button 
              onClick={() => setMode('video')}
              className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition ${mode === 'video' ? 'bg-[#3a3a3c] text-white shadow' : 'text-gray-400'}`}
            >
              Gen Video (Veo)
            </button>
          </div>

          {!result ? (
            <div className="space-y-4">
              {mode === 'edit' && selectedImageUrl && (
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-700">
                  <img src={selectedImageUrl} alt="Original" className="w-full h-full object-cover" />
                </div>
              )}
              <textarea 
                placeholder={mode === 'edit' ? "e.g., 'Add a neon futuristic helmet' or 'Make it a painting'" : "Describe your video e.g., 'A girl walking through a cyberpunk Tokyo'"}
                className="w-full bg-[#2c2c2e] text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={handleProcess}
                disabled={loading || !prompt}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-50 py-3 rounded-xl font-bold text-sm"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-sparkles mr-2"></i>}
                {loading ? 'Processing...' : 'Magic Generate'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-700 bg-black">
                {mode === 'edit' ? (
                  <img src={result} alt="Result" className="w-full h-full object-cover" />
                ) : (
                  <video src={result} controls autoPlay className="w-full h-full" />
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setResult(null)}
                  className="flex-1 bg-gray-800 py-2.5 rounded-lg text-sm font-semibold"
                >
                  Try Again
                </button>
                <button 
                  className="flex-1 bg-blue-600 py-2.5 rounded-lg text-sm font-semibold"
                  onClick={() => {
                    // Download logic
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = mode === 'edit' ? 'gemini-edit.png' : 'gemini-video.mp4';
                    link.click();
                  }}
                >
                  Save to Device
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;
