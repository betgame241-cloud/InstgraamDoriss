import React, { useState, useMemo, useEffect } from 'react';
import ProfileHeader from './components/ProfileHeader.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import Highlights from './components/Highlights.tsx';
import TabNavigation from './components/TabNavigation.tsx';
import MediaGrid from './components/MediaGrid.tsx';
import AIModal from './components/AIModal.tsx';
import EditProfileModal from './components/EditProfileModal.tsx';
import UploadModal from './components/UploadModal.tsx';
import { PUBLIC_PROFILE_DATA, PERSONAL_PROFILE_DATA } from './constants.tsx';
import { Post, ProfileData, Story, Highlight } from './types.ts';
import { analyzeProfile } from './services/gemini.ts';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'grid' | 'reels' | 'tagged'>('grid');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadInitialType, setUploadInitialType] = useState<'post' | 'reel' | 'story' | 'highlight'>('post');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [profileIndex, setProfileIndex] = useState(0); // 0: Doris, 1: Personal
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [sharedPosts, setSharedPosts] = useState<Post[]>(PUBLIC_PROFILE_DATA.posts);
  const [sharedReels, setSharedReels] = useState<Post[]>(PUBLIC_PROFILE_DATA.reels);
  const [sharedStories, setSharedStories] = useState<Story[]>([]);
  const [sharedHighlights, setSharedHighlights] = useState<Highlight[]>(PUBLIC_PROFILE_DATA.highlights);
  const [personalProfilePic, setPersonalProfilePic] = useState<string>(PERSONAL_PROFILE_DATA.profilePicUrl);
  
  const [profileMeta, setProfileMeta] = useState({
    fullName: PUBLIC_PROFILE_DATA.fullName,
    bio: PUBLIC_PROFILE_DATA.bio,
    postCount: PUBLIC_PROFILE_DATA.postCount,
    followerCount: PUBLIC_PROFILE_DATA.followerCount,
    followingCount: PUBLIC_PROFILE_DATA.followingCount,
  });

  const isPublicView = profileIndex === 0;

  const currentProfile: ProfileData = useMemo(() => {
    const base = isPublicView ? PUBLIC_PROFILE_DATA : PERSONAL_PROFILE_DATA;
    return {
      ...base,
      ...profileMeta,
      username: isPublicView ? PUBLIC_PROFILE_DATA.username : PERSONAL_PROFILE_DATA.username,
      profilePicUrl: isPublicView ? PUBLIC_PROFILE_DATA.profilePicUrl : personalProfilePic,
      posts: isPublicView ? PUBLIC_PROFILE_DATA.posts : sharedPosts,
      reels: isPublicView ? PUBLIC_PROFILE_DATA.reels : sharedReels,
      stories: isPublicView ? [] : sharedStories,
      highlights: isPublicView ? PUBLIC_PROFILE_DATA.highlights : sharedHighlights
    };
  }, [profileIndex, profileMeta, personalProfilePic, sharedPosts, sharedReels, sharedStories, sharedHighlights, isPublicView]);

  const currentMedia = useMemo(() => {
    switch (activeTab) {
      case 'reels': return currentProfile.reels;
      case 'tagged': return currentProfile.tagged;
      default: return currentProfile.posts;
    }
  }, [activeTab, currentProfile]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000]">
        <div className="w-20 h-20 mb-8">
           <svg viewBox="0 0 512 512" className="w-full h-full fill-white animate-pulse">
             <path d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/>
             <path d="M256 149.33a106.67 106.67 0 1 0 106.67 106.67A106.67 106.67 0 0 0 256 149.33zm0 176a69.33 69.33 0 1 1 69.33-69.33A69.33 69.33 0 0 1 256 325.33zM389.33 98.67a24 24 0 1 0 24 24 24 24 0 0 0-24-24z"/>
           </svg>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center">
          <span className="text-gray-500 text-[12px] font-semibold mb-2">from</span>
          <span className="text-white font-bold tracking-[2px] text-lg">METALAB</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#121212] min-h-screen">
      <div className="w-full max-w-[480px] bg-black min-h-screen pb-[60px] relative shadow-2xl md:border-x border-gray-900 overflow-hidden">
        
        <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-between px-4 h-[48px] border-b border-gray-900/50">
          <div className="flex items-center space-x-1 cursor-pointer active:opacity-60 transition" onClick={() => setShowAccountSelector(true)}>
            {isPublicView && <i className="fa-solid fa-chevron-left mr-3 text-xl"></i>}
            <span className="font-bold text-[20px] tracking-tight">{currentProfile.username}</span>
            <i className="fa-solid fa-chevron-down text-[10px] ml-1.5 text-gray-500"></i>
            {currentProfile.isVerified && <i className="fa-solid fa-circle-check text-[#0095f6] text-[14px] ml-1.5"></i>}
          </div>
          
          <div className="flex space-x-5 items-center">
            {isPublicView ? (
              <>
                <i className="fa-regular fa-bell text-2xl"></i>
                <i className="fa-solid fa-ellipsis text-2xl"></i>
              </>
            ) : (
              <button onClick={() => { setUploadInitialType('post'); setIsUploadModalOpen(true); }} className="active:scale-90 transition">
                <i className="fa-regular fa-square-plus text-2xl"></i>
              </button>
            )}
          </div>
        </div>

        <div className="animate-fade-in">
          <ProfileHeader 
            data={currentProfile} 
            isPersonal={!isPublicView}
            onAddStory={() => { setUploadInitialType('story'); setIsUploadModalOpen(true); }}
            onUpdateProfilePic={(url) => setPersonalProfilePic(url)}
          />
          <ActionButtons 
            isPublic={isPublicView}
            onEdit={() => setIsEditModalOpen(true)} 
            onMenuClick={() => setShowAccountSelector(true)}
          />

          <Highlights 
            highlights={currentProfile.highlights} 
            showNew={!isPublicView}
            onNewHighlight={() => { setUploadInitialType('highlight'); setIsUploadModalOpen(true); }}
          />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <MediaGrid 
            posts={currentMedia} 
            isInteractive={!isPublicView}
            onPostClick={(post) => { 
              if (!isPublicView) {
                setSelectedPost(post); 
                setIsAIModalOpen(true); 
              }
            }}
            variant={activeTab === 'reels' ? 'reels' : 'square'}
          />
        </div>

        {/* ACCOUNT SELECTOR */}
        {showAccountSelector && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAccountSelector(false)}></div>
            <div className="relative w-full max-w-[480px] bg-[#262626] rounded-t-[20px] pb-10 animate-slide-up border-t border-gray-800 shadow-2xl">
              <div className="w-10 h-[4px] bg-[#363636] rounded-full mx-auto mt-3 mb-6"></div>
              <div className="px-5 py-4 border-b border-gray-800/50 mb-2">
                <span className="text-white font-bold">Cambiar cuenta</span>
              </div>
              
              <div 
                className={`flex items-center justify-between px-5 py-4 cursor-pointer transition ${profileIndex === 0 ? 'bg-white/5' : 'hover:bg-white/5'}`} 
                onClick={() => { setProfileIndex(0); setShowAccountSelector(false); }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-[1.5px] rounded-full ${profileIndex === 0 ? 'bg-blue-500' : 'bg-transparent'}`}>
                    <img src={PUBLIC_PROFILE_DATA.profilePicUrl} className="w-14 h-14 rounded-full object-cover border-2 border-[#262626]" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[15px] ${profileIndex === 0 ? 'font-bold text-white' : 'text-gray-400'}`}>
                      {PUBLIC_PROFILE_DATA.username}
                    </span>
                    <span className="text-xs text-gray-500">Perfil Público</span>
                  </div>
                </div>
                {profileIndex === 0 && <i className="fa-solid fa-circle-check text-blue-500 text-xl"></i>}
              </div>

              <div 
                className={`flex items-center justify-between px-5 py-4 cursor-pointer transition mt-2 ${profileIndex === 1 ? 'bg-white/5' : 'hover:bg-white/5'}`} 
                onClick={() => { setProfileIndex(1); setShowAccountSelector(false); }}
              >
                <div className="flex items-center space-x-4">
                   <div className={`p-[1.5px] rounded-full ${profileIndex === 1 ? 'bg-blue-500' : 'bg-transparent'}`}>
                    <img src={personalProfilePic} className="w-14 h-14 rounded-full object-cover border-2 border-[#262626]" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[15px] ${profileIndex === 1 ? 'font-bold text-white' : 'text-gray-400'}`}>
                      {PERSONAL_PROFILE_DATA.username}
                    </span>
                    <span className="text-xs text-gray-500">Tu Perfil Personal</span>
                  </div>
                </div>
                {profileIndex === 1 && <i className="fa-solid fa-circle-check text-blue-500 text-xl"></i>}
              </div>
            </div>
          </div>
        )}

        <AIModal isOpen={isAIModalOpen} onClose={() => { setIsAIModalOpen(false); setSelectedPost(null); }} selectedImageUrl={selectedPost?.imageUrl} />
        <EditProfileModal isOpen={isEditModalOpen} data={currentProfile} onClose={() => setIsEditModalOpen(false)} onSave={(newData) => {
          setProfileMeta(prev => ({ ...prev, ...newData as any }));
        }} />
        <UploadModal isOpen={isUploadModalOpen} initialType={uploadInitialType} onClose={() => setIsUploadModalOpen(false)} onUpload={(type, url, title) => {
           if (type === 'post') setSharedPosts(prev => [{id: Date.now().toString(), imageUrl: url}, ...prev]);
           if (type === 'reel') setSharedReels(prev => [{id: Date.now().toString(), imageUrl: url, isVideo: true, viewsCount: '1M'}, ...prev]);
           if (type === 'highlight') setSharedHighlights(prev => [...prev, {id: Date.now().toString(), label: title || 'Destacado', imageUrl: url}]);
        }} />
      </div>
    </div>
  );
};

export default App;