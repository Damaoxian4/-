import React, { useCallback } from 'react';
import { UploadedImage, Gender } from '../types';

interface ImageUploadProps {
  gender: Gender;
  image: UploadedImage | null;
  onUpload: (image: UploadedImage) => void;
  onClear: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ gender, image, onUpload, onClear }) => {
  const isMale = gender === Gender.MALE;
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload({
          file,
          previewUrl: URL.createObjectURL(file),
          base64: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto group">
      <h3 className={`text-2xl font-serif mb-6 pb-2 border-b border-stone-800 w-full text-center tracking-widest 
        ${isMale ? 'text-slate-300' : 'text-rose-200/80'}`}>
        {gender}
      </h3>
      
      {/* Frame Container */}
      <div className={`relative w-56 h-72 transition-all duration-500 
        ${image 
          ? 'shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-100' 
          : 'hover:scale-[1.02]'}
      `}>
        
        {/* Decorative Frame Border */}
        <div className={`absolute inset-0 pointer-events-none z-20 border-[6px] 
          ${image ? 'border-amber-900/60' : 'border-stone-800'} 
          ${isMale ? 'rounded-t-lg rounded-b-lg' : 'rounded-t-full rounded-b-lg'}
          transition-colors duration-500
        `}></div>
        
        {/* Inner Border/Matte */}
        <div className={`absolute inset-[6px] pointer-events-none z-20 border border-stone-700/50
          ${isMale ? 'rounded-t-[2px] rounded-b-[2px]' : 'rounded-t-full rounded-b-[2px]'}
        `}></div>

        <div className={`w-full h-full bg-[#1c1917] overflow-hidden flex flex-col items-center justify-center relative
          ${isMale ? 'rounded-t-lg rounded-b-lg' : 'rounded-t-full rounded-b-lg'}
        `}>
          
          {image ? (
            <>
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img 
                src={image.previewUrl} 
                alt="Uploaded face" 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
              />
              <button 
                onClick={onClear}
                className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-red-900/80 text-white/70 hover:text-white rounded-full p-2 transition-all backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </>
          ) : (
            <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-4 hover:bg-stone-800/30 transition-colors group-hover:bg-stone-800/50">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center mb-3 group-hover:border-amber-700/50 transition-colors">
                 <svg className="w-6 h-6 text-stone-500 group-hover:text-amber-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                 </svg>
              </div>
              <span className="text-sm text-stone-500 font-serif tracking-widest group-hover:text-stone-400">点击上传</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;