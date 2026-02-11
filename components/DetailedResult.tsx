import React from 'react';
import { FaceAnalysis, Gender } from '../types';

interface DetailedResultProps {
  analysis: FaceAnalysis;
  gender: Gender;
}

const DetailedResult: React.FC<DetailedResultProps> = ({ analysis, gender }) => {
  const isMale = gender === Gender.MALE;
  
  // Color Themes
  const theme = {
    title: isMale ? 'text-sky-200' : 'text-rose-200',
    border: isMale ? 'border-sky-900/20' : 'border-rose-900/20',
    accent: isMale ? 'text-sky-700' : 'text-rose-700',
    bg: isMale ? 'bg-sky-900/10' : 'bg-rose-900/10',
    progress: isMale ? 'bg-sky-700' : 'bg-rose-700'
  };

  const dimensions = [
    { label: '天庭 (事业)', data: analysis.tianting },
    { label: '目神 (心性)', data: analysis.mushen },
    { label: '财帛 (财运)', data: analysis.caibo },
    { label: '颧骨 (权力)', data: analysis.quangu },
    { label: '含露 (情感)', data: analysis.hanlu },
    { label: '寿堂 (健康)', data: analysis.shoutang },
  ];

  return (
    <div className={`bg-[#1c1917] border border-stone-800 p-8 relative overflow-hidden h-full flex flex-col`}>
      {/* Decorative Character */}
      <div className={`absolute -right-4 -top-8 text-[8rem] opacity-[0.04] font-serif pointer-events-none select-none ${theme.title}`}>
        {isMale ? '乾' : '坤'}
      </div>

      <div className="relative z-10 mb-8">
        <h3 className={`text-2xl font-serif font-bold flex items-center justify-between ${theme.title}`}>
          {isMale ? '男方 · 乾造' : '女方 · 坤造'} 
        </h3>
        <div className={`w-12 h-1 mt-3 ${theme.progress} opacity-50`}></div>
      </div>
      
      {/* Overall Fortune */}
      <div className={`mb-8 p-5 ${theme.bg} border-l-2 ${theme.border} text-stone-300 text-sm leading-relaxed text-justify font-light`}>
        <span className={`${theme.accent} text-lg mr-1 font-serif`}>"</span>
        {analysis.overallFortune}
      </div>

      {/* Dimensions Grid */}
      <div className="space-y-6 flex-1">
        {dimensions.map((dim, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-400 font-serif text-sm">{dim.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
                   <div className={`h-full ${theme.progress} opacity-60`} style={{ width: `${dim.data.score}%` }}></div>
                </div>
                <span className={`text-xs font-mono opacity-50 ${theme.title}`}>{dim.data.score}</span>
              </div>
            </div>
            <p className="text-stone-500 text-xs leading-5 text-justify group-hover:text-stone-300 transition-colors duration-300 border-b border-stone-800/50 pb-3 group-last:border-0">
              {dim.data.analysis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedResult;