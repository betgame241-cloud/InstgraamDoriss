
import React, { useState } from 'react';
import { ProfileData } from '../types';

interface EditProfileModalProps {
  data: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: Partial<ProfileData>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ data, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName,
    bio: data.bio,
    followerCount: data.followerCount,
    postCount: data.postCount,
    followingCount: data.followingCount,
    likesCount: data.likesCount || '',
    lovesCount: data.lovesCount || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1e] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center">
          <button onClick={onClose} className="text-white text-sm">Cancelar</button>
          <h2 className="font-bold text-white">Editar perfil</h2>
          <button onClick={handleSubmit} className="text-blue-500 font-bold text-sm">Listo</button>
        </div>
        
        <form className="p-4 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase font-bold">Nombre</label>
            <input 
              className="w-full bg-transparent border-b border-gray-800 text-white py-1 outline-none focus:border-blue-500"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase font-bold">Biografía</label>
            <textarea 
              className="w-full bg-transparent border-b border-gray-800 text-white py-1 outline-none focus:border-blue-500 min-h-[80px]"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 pb-2">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase font-bold">Publics.</label>
              <input 
                className="w-full bg-transparent border-b border-gray-800 text-white py-1 outline-none focus:border-blue-500"
                value={formData.postCount}
                onChange={(e) => setFormData({...formData, postCount: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase font-bold">Seguidores</label>
              <input 
                className="w-full bg-transparent border-b border-gray-800 text-white py-1 outline-none focus:border-blue-500"
                value={formData.followerCount}
                onChange={(e) => setFormData({...formData, followerCount: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase font-bold">Seguidos</label>
              <input 
                className="w-full bg-transparent border-b border-gray-800 text-white py-1 outline-none focus:border-blue-500"
                value={formData.followingCount}
                onChange={(e) => setFormData({...formData, followingCount: e.target.value})}
              />
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 space-y-4">
            <h3 className="text-xs text-blue-500 uppercase font-black">Estadísticas de impacto (Sincronizadas)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 uppercase font-bold flex items-center">
                  <i className="fa-solid fa-heart text-red-500 mr-1.5"></i> MG (Me gusta)
                </label>
                <input 
                  placeholder="Ej: 12.4M"
                  className="w-full bg-[#2c2c2e] rounded-lg px-3 py-2 text-white outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.likesCount}
                  onChange={(e) => setFormData({...formData, likesCount: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 uppercase font-bold flex items-center">
                  <i className="fa-solid fa-fire text-orange-500 mr-1.5"></i> Me encanta
                </label>
                <input 
                  placeholder="Ej: 8.2M"
                  className="w-full bg-[#2c2c2e] rounded-lg px-3 py-2 text-white outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.lovesCount}
                  onChange={(e) => setFormData({...formData, lovesCount: e.target.value})}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
