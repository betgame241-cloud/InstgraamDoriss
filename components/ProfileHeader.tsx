
import React, { useRef } from 'react';
import { ProfileData } from '../types';

interface ProfileHeaderProps {
  data: ProfileData;
  onAddStory?: () => void;
  onUpdateProfilePic?: (url: string) => void;
  isPersonal?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ data, onAddStory, onUpdateProfilePic, isPersonal }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isPersonal && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const hasStories = data.stories && data.stories.length > 0;

  // Renderizado para Perfil Público (Inerte)
  if (!isPersonal) {
    return (
      <div className="px-4 pt-4 select-none">
        <div className="flex items-center space-x-8 mb-4">
          <div className="relative">
            <div className={`w-[82px] h-[82px] rounded-full p-[2.5px] ${hasStories ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' : 'bg-gray-800'}`}>
              <div className="bg-black rounded-full p-[2px] w-full h-full overflow-hidden">
                <img 
                  src={data.profilePicUrl} 
                  alt={data.username} 
                  className="w-full h-full rounded-full object-cover border border-black"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between px-2 text-center">
              <div className="flex flex-col">
                <span className="font-bold text-[18px]">{data.postCount}</span>
                <span className="text-[13px] text-gray-400">Publics.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[18px]">{data.followerCount}</span>
                <span className="text-[13px] text-gray-400">Seguidores</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[18px]">{data.followingCount}</span>
                <span className="text-[13px] text-gray-400">Seguidos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[14px] leading-tight mb-4">
          <div className="flex items-center space-x-1 mb-0.5">
            <h1 className="font-bold text-[15px]">{data.fullName}</h1>
          </div>
          {data.category && <p className="text-gray-400 mb-0.5">{data.category}</p>}
          <p className="whitespace-pre-line text-white/95">{data.bio}</p>
          {data.links.map((link, idx) => (
            <div key={idx} className="flex items-center space-x-1 text-[#e0f1ff] font-semibold mt-1">
              <i className="fa-solid fa-link text-[10px]"></i>
              <span className="hover:underline cursor-default">{link}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizado para Perfil Personal (Interactivo)
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center space-x-8 mb-4">
        <div className="relative">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onUpdateProfilePic) {
                const reader = new FileReader();
                reader.onloadend = () => onUpdateProfilePic(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          
          <div 
            onClick={handleImageClick}
            className={`w-[82px] h-[82px] rounded-full p-[2.5px] cursor-pointer active:scale-95 transition-all 
              ${hasStories ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' : 'bg-gray-800'}
            `}
          >
            <div className="bg-black rounded-full p-[2px] w-full h-full overflow-hidden">
              <img 
                src={data.profilePicUrl} 
                alt={data.username} 
                className="w-full h-full rounded-full object-cover border border-black"
              />
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onAddStory?.(); }}
            className="absolute bottom-0 right-0 bg-blue-500 w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center active:scale-90 transition shadow-lg"
          >
            <i className="fa-solid fa-plus text-white text-[11px]"></i>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between px-2 text-center">
            <div className="flex flex-col">
              <span className="font-bold text-[18px]">{data.postCount}</span>
              <span className="text-[13px] text-gray-400">Publics.</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[18px]">{data.followerCount}</span>
              <span className="text-[13px] text-gray-400">Seguidores</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[18px]">{data.followingCount}</span>
              <span className="text-[13px] text-gray-400">Seguidos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[14px] leading-tight mb-4">
        <div className="flex items-center space-x-1 mb-0.5">
          <h1 className="font-bold text-[15px]">{data.fullName}</h1>
          {data.isPrivate && <i className="fa-solid fa-lock text-[10px] text-gray-400"></i>}
        </div>
        <p className="whitespace-pre-line text-white/95">{data.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
