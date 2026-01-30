
import React, { useState, useRef, useEffect } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (type: 'post' | 'reel' | 'story' | 'highlight', url: string, title?: string) => void;
  initialType?: 'post' | 'reel' | 'story' | 'highlight';
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload, initialType = 'post' }) => {
  const [type, setType] = useState<'post' | 'reel' | 'story' | 'highlight'>(initialType);
  const [fileData, setFileData] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setFileData(null);
      setTitle('');
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (!fileData) return alert('Por favor selecciona una imagen o video de tu galería');
    onUpload(type, fileData, title || (type === 'story' ? 'Historia' : 'Destacada'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-0 md:p-4">
      <div className="bg-[#1c1c1e] w-full max-w-md h-full md:h-auto md:max-h-[90vh] md:rounded-2xl overflow-hidden flex flex-col shadow-2xl border-x border-gray-800 animate-slide-up">
        <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center bg-[#1c1c1e]">
          <button onClick={onClose} className="text-white text-[15px]">Cancelar</button>
          <h2 className="font-bold text-white text-[16px]">Nueva publicación</h2>
          <button onClick={handleConfirm} className="text-blue-500 font-bold text-[15px] disabled:opacity-50" disabled={!fileData}>
            Compartir
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex justify-around bg-[#2c2c2e] p-1 rounded-xl">
            {(['post', 'reel', 'story', 'highlight'] as const).map((t) => (
              <button 
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all capitalize ${type === t ? 'bg-[#3a3a3c] text-white' : 'text-gray-500'}`}
              >
                {t === 'post' ? 'Post' : t === 'reel' ? 'Reel' : t === 'story' ? 'Historia' : 'Destacado'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square bg-[#2c2c2e] rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
            >
              {fileData ? (
                <>
                  <img src={fileData} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white font-bold text-sm">Cambiar archivo</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#3a3a3c] flex items-center justify-center mb-3">
                    <i className="fa-solid fa-images text-xl text-gray-400"></i>
                  </div>
                  <span className="text-white font-bold text-sm">Seleccionar de la galería</span>
                  <span className="text-gray-500 text-[11px] mt-1">Fotos o Videos</span>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </div>

            {(type === 'story' || type === 'highlight') && (
              <div className="space-y-1">
                <label className="text-[11px] text-gray-500 uppercase font-bold ml-1">Título del destacado</label>
                <input 
                  type="text"
                  placeholder="Ej: Recuerdos"
                  className="w-full bg-[#2c2c2e] text-white rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            )}

            <div className="bg-[#2c2c2e]/50 p-3 rounded-xl">
              <p className="text-[12px] text-gray-400 text-center">
                Tu publicación aparecerá en el feed y se sincronizará con tu perfil público.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
