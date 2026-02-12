import React, { useEffect, useState } from 'react';

const LoadingOverlay: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["观人气色", "推演五行", "定盘乾坤", "探寻姻缘"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 八卦符号
  const trigrams = [
    { symbol: '☰', name: '乾', deg: 0 },
    { symbol: '☱', name: '兑', deg: 45 },
    { symbol: '☲', name: '离', deg: 90 },
    { symbol: '☳', name: '震', deg: 135 },
    { symbol: '☴', name: '巽', deg: 180 },
    { symbol: '☵', name: '坎', deg: 225 },
    { symbol: '☶', name: '艮', deg: 270 },
    { symbol: '☷', name: '坤', deg: 315 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-md animate-fadeIn">
      {/* 核心魔法阵容器 */}
      <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center">
        
        {/* 背景光晕 */}
        <div className="absolute inset-0 bg-amber-900/10 rounded-full blur-[60px] animate-pulse"></div>

        {/* 外圈 - 逆时针旋转的符文圈 */}
        <div className="absolute inset-0 rounded-full border border-stone-800/60 animate-[spin_20s_linear_infinite_reverse] opacity-40">
           <div className="absolute inset-[10px] border border-dashed border-stone-700/40 rounded-full"></div>
        </div>

        {/* 中圈 - 八卦阵 (顺时针旋转) */}
        <div className="absolute inset-12 md:inset-16 animate-[spin_15s_linear_infinite]">
          {trigrams.map((t, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1/2 origin-bottom pt-2"
              style={{ transform: `translateX(-50%) rotate(${t.deg}deg)` }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-3xl text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ writingMode: 'vertical-rl' }}>
                  {t.symbol}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 内圈 - 几何连线 (慢速逆时针) */}
        <div className="absolute inset-24 md:inset-32 rounded-full border border-amber-900/30 animate-[spin_12s_linear_infinite_reverse]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border border-amber-500/20 rotate-45 scale-75"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border border-amber-500/20 rotate-0 scale-75"></div>
        </div>

        {/* 核心 - 阴阳/能量球 */}
        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-900 via-stone-900 to-black border border-amber-700/50 shadow-[0_0_30px_rgba(217,119,6,0.4)] flex items-center justify-center overflow-hidden">
            {/* 内部流光 */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(217,119,6,0.2)_180deg,transparent_360deg)] animate-[spin_3s_linear_infinite]"></div>
            
            {/* 中心字 */}
            <div className="relative z-20 text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 animate-pulse">
                合
            </div>
        </div>
      </div>

      {/* 底部文字提示 */}
      <div className="mt-12 relative h-10">
        <p key={textIndex} className="text-xl md:text-2xl font-serif text-amber-100/80 tracking-[0.5em] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-0 absolute left-1/2 -translate-x-1/2 w-full text-center">
           {texts[textIndex]}
        </p>
        <p key={`static-${textIndex}`} className="text-xl md:text-2xl font-serif text-amber-100/90 tracking-[0.5em] animate-fadeUp absolute left-1/2 -translate-x-1/2 w-full text-center">
           {texts[textIndex]}
        </p>
      </div>

      {/* 装饰线条 */}
      <div className="mt-8 flex items-center gap-4 opacity-50">
         <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-800"></div>
         <div className="w-2 h-2 rotate-45 border border-amber-600"></div>
         <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-800"></div>
      </div>

      {/* CSS 补充 - 用于特定动画 */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
