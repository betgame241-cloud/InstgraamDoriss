
import React, { useState } from 'react';

interface ActionButtonsProps {
  isPublic: boolean;
  onEdit: () => void;
  onMenuClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isPublic, onEdit, onMenuClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (isPublic) {
    return (
      <div className="px-4 py-1 flex space-x-1.5 mb-6">
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex-1 font-semibold py-[7px] px-4 rounded-lg text-[14px] active:opacity-70 transition ${
            isFollowing ? 'bg-[#363636] text-white' : 'bg-[#0095f6] text-white'
          }`}
        >
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
        <a 
          href="mailto:martinezarmando55573@gmail.com"
          className="flex-1 bg-[#363636] text-center text-white font-semibold py-[7px] px-4 rounded-lg text-[14px] active:opacity-70 transition flex items-center justify-center"
        >
          Correo
        </a>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`py-[7px] px-[10px] rounded-lg text-[14px] active:opacity-70 transition ${
            isAdding ? 'bg-[#4a4a4a]' : 'bg-[#363636]'
          } text-white`}
        >
          <i className={`fa-solid ${isAdding ? 'fa-user-check' : 'fa-user-plus'} text-[12px]`}></i>
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-1 flex space-x-1.5 mb-6">
      <button 
        onClick={onEdit}
        className="flex-1 bg-[#363636] text-white font-semibold py-[7px] px-4 rounded-lg text-[14px] active:opacity-70 transition"
      >
        Editar perfil
      </button>
      <button 
        className="flex-1 bg-[#363636] text-white font-semibold py-[7px] px-4 rounded-lg text-[14px] active:opacity-70 transition"
        onClick={onMenuClick}
      >
        Compartir perfil
      </button>
      <button 
        onClick={onMenuClick}
        className="bg-[#363636] text-white py-[7px] px-[12px] rounded-lg text-[14px] active:opacity-70 transition"
      >
        <i className="fa-solid fa-ellipsis text-[14px]"></i>
      </button>
    </div>
  );
};

export default ActionButtons;
