
import React from 'react';

interface TabNavigationProps {
  activeTab: 'grid' | 'reels' | 'tagged';
  setActiveTab: (tab: 'grid' | 'reels' | 'tagged') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-t border-gray-900">
      <button 
        onClick={() => setActiveTab('grid')}
        className={`flex-1 flex justify-center py-3.5 transition ${activeTab === 'grid' ? 'border-t-[1.5px] border-white text-white' : 'text-gray-500'}`}
      >
        <svg aria-label="Publicaciones" className="w-6 h-6" color="currentColor" fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M20.662 20.449a1.684 1.684 0 0 1-1.682 1.683H5.02a1.684 1.684 0 0 1-1.683-1.683V5.02a1.684 1.684 0 0 1 1.683-1.682h13.96a1.684 1.684 0 0 1 1.682 1.682Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.031" x2="10.031" y1="3.338" y2="22.131"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.969" x2="13.969" y1="3.338" y2="22.131"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="22.131" x2="1.869" y1="13.969" y2="13.969"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="22.131" x2="1.869" y1="10.031" y2="10.031"></line></svg>
      </button>
      <button 
        onClick={() => setActiveTab('reels')}
        className={`flex-1 flex justify-center py-3.5 transition ${activeTab === 'reels' ? 'border-t-[1.5px] border-white text-white' : 'text-gray-500'}`}
      >
        <svg aria-label="Reels" className="w-6 h-6" color="currentColor" fill="currentColor" role="img" viewBox="0 0 24 24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.951" y1="7.002" y2="7.002"></line><path d="M11.998 12.002 9.42 9.424 21.365 3.39c.28-.141.527.106.386.386l-6.034 11.945-2.58-2.58Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M2.049 7.002v12.449a1.55 1.55 0 0 0 1.55 1.55h16.802a1.55 1.55 0 0 0 1.55-1.55V7.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="m5.176 3.338-1.577 3.664M8.981 3.338l-1.577 3.664M12.787 3.338l-1.577 3.664M16.593 3.338l-1.577 3.664M20.398 3.338l-1.577 3.664" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
      </button>
      <button 
        onClick={() => setActiveTab('tagged')}
        className={`flex-1 flex justify-center py-3.5 transition ${activeTab === 'tagged' ? 'border-t-[1.5px] border-white text-white' : 'text-gray-500'}`}
      >
        <svg aria-label="Etiquetadas" className="w-6 h-6" color="currentColor" fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
      </button>
    </div>
  );
};

export default TabNavigation;
