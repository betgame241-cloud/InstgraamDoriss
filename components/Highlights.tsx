
import React from 'react';
import { Highlight } from '../types';

interface HighlightsProps {
  highlights: Highlight[];
  showNew?: boolean;
  onNewHighlight?: () => void;
}

const Highlights: React.FC<HighlightsProps> = ({ highlights, showNew, onNewHighlight }) => {
  return (
    <div className="flex space-x-[18px] px-4 pb-4 overflow-x-auto no-scrollbar items-start">
      {highlights.map((h) => (
        <div key={h.id} className="flex flex-col items-center space-y-1.5 min-w-[64px]">
          <div className="w-[64px] h-[64px] rounded-full p-[3px] border border-gray-800">
            <div className="w-full h-full rounded-full border border-black overflow-hidden bg-[#121212]">
              <img 
                src={h.imageUrl} 
                alt={h.label} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-[12px] text-white leading-none truncate w-16 text-center">{h.label}</span>
        </div>
      ))}
      
      {showNew && (
        <div 
          className="flex flex-col items-center space-y-1.5 min-w-[64px] cursor-pointer active:scale-95 transition"
          onClick={onNewHighlight}
        >
          <div className="w-[64px] h-[64px] rounded-full border border-gray-800 flex items-center justify-center bg-black">
            <i className="fa-solid fa-plus text-white text-lg"></i>
          </div>
          <span className="text-[12px] text-white leading-none">Nuevo</span>
        </div>
      )}
    </div>
  );
};

export default Highlights;
