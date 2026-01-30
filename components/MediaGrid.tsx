
import React from 'react';
import { Post } from '../types';

interface MediaGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  variant?: 'square' | 'reels';
  isInteractive?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ posts, onPostClick, variant = 'square', isInteractive = true }) => {
  const displayPosts = posts.slice(0, 12);

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {displayPosts.map((post) => (
        <div 
          key={post.id} 
          className={`relative ${variant === 'reels' ? 'aspect-[2/3.5]' : 'aspect-square'} overflow-hidden ${isInteractive ? 'cursor-pointer group' : 'cursor-default'}`}
          onClick={() => isInteractive && onPostClick(post)}
        >
          <img 
            src={post.imageUrl} 
            alt="Instagram Content" 
            className="w-full h-full object-cover"
          />
          
          {/* Icono de Pin (Fijo) */}
          {post.isPinned && variant === 'square' && (
            <div className="absolute top-2 right-2 text-white drop-shadow-lg">
              <i className="fa-solid fa-thumbtack -rotate-45 text-[10px]"></i>
            </div>
          )}

          {/* Icono de Video en Grid Principal */}
          {post.isVideo && variant === 'square' && (
            <div className="absolute top-2 right-2 text-white drop-shadow-md">
              <svg aria-label="Reels" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="m15 12-5-3v6l5-3z" fill="currentColor" />
              </svg>
            </div>
          )}

          {/* EL OJITO (Vistas): Visible en Reels y Videos del Perfil Público */}
          {(post.isVideo || variant === 'reels') && (
            <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <svg aria-label="Reproducciones" className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-[12px] font-bold tracking-tight">
                {post.viewsCount || '1.1M'}
              </span>
            </div>
          )}

          {/* Sutil overlay al tocar (Solo si es interactivo) */}
          {isInteractive && (
            <div className="absolute inset-0 bg-black/5 opacity-0 active:opacity-100 transition-opacity"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
