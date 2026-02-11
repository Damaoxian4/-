import React, { useState, useRef } from 'react';
import ImageUpload from './components/ImageUpload';
import DimensionChart from './components/DimensionChart';
import DetailedResult from './components/DetailedResult';
import { UploadedImage, Gender, RelationshipAnalysis } from './types';
import { analyzeFaces } from './services/geminiService';

const App: React.FC = () => {
  const [maleImage, setMaleImage] = useState<UploadedImage | null>(null);
  const [femaleImage, setFemaleImage] = useState<UploadedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RelationshipAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!maleImage || !femaleImage) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeFaces(maleImage.base64, femaleImage.base64);
      setResult(data);
      // Wait for render then scroll
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      // 更加详细的错误处理，帮助排查问题
      let errorMessage = "测算过程中天机受阻，请稍后再试或更换照片。";
      
      if (err instanceof Error) {
        // 优先显示 Service 层抛出的具体配置错误 (包含 "Redeploy" 提示的那个)
        if (err.message.includes("API Key missing")) {
          errorMessage = `配置错误: ${err.message}`;
        }
        // 其他 API Key 相关错误
        else if (err.message.includes("API key")) {
          errorMessage = "配置错误：未找到有效的 API Key，请检查环境变量设置。";
        } 
        // 安全拦截
        else if (err.message.includes("SAFETY") || err.message.includes("blocked")) {
          errorMessage = "照片因包含敏感信息被拦截，请尝试更换照片。";
        }
        // 其他错误
        else {
          errorMessage = `测算失败: ${err.message}`;
        }
      }
      
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const reset = () => {
    setMaleImage(null);
    setFemaleImage(null);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 bg-[#050505] text-stone-200 selection:bg-amber-900 selection:text-white font-serif overflow-x-hidden relative">
      
      {/* --- Oriental Mystical Background Layer --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Ink Base Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1917] via-[#0a0a09] to-[#000000]"></div>
        
        {/* Traditional Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6d3d1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }}>
        </div>

        {/* Ambient "Qi" Glows */}
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-1/4 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        {/* Decorative Compass Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-stone-800/20 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-stone-800/10 rounded-full pointer-events-none border-dashed"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-24 text-center relative">
          {/* Vertical Mystic Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-amber-900/40 to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] mb-10 text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#d97706] to-[#78350f] drop-shadow-[0_2px_10px_rgba(180,83,9,0.3)]">
              缘分天注定 | 面相知天命
            </h1>
            
            {/* Subtitle with refined "Seal" aesthetics */}
            <div className="mb-16 relative group cursor-default select-none inline-block">
               <div className="absolute -inset-4 bg-amber-900/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <p className="relative text-xl md:text-2xl font-serif font-bold tracking-[0.4em] text-[#e7e5e4] opacity-90">
                  <span className="text-amber-700/60 mr-2">「</span>
                  相由心生 &nbsp; 命由己造
                  <span className="text-amber-700/60 ml-2">」</span>
               </p>
            </div>
            
            <p className="text-stone-400 text-base md:text-lg font-light tracking-widest max-w-2xl mx-auto leading-loose border-t border-b border-stone-800/50 py-4 bg-[#0c0a09]/30 backdrop-blur-sm">
              <span className="text-amber-800 mx-3">❖</span>
              上传男方和女方面部照片，为您解析这段姻缘的前世今生
              <span className="text-amber-800 mx-3">❖</span>
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 max-w-6xl space-y-24">
          
          {/* Upload Section - Always Visible */}
          <section className="transition-all duration-700 ease-in-out">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
              <ImageUpload 
                gender={Gender.MALE} 
                image={maleImage} 
                onUpload={setMaleImage} 
                onClear={() => setMaleImage(null)} 
              />
              
              <div className="flex md:flex-col items-center gap-6 opacity-80">
                 <div className="w-24 h-[1px] md:w-[1px] md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
                 <div className="relative">
                   <div className="absolute inset-0 bg-amber-900/20 blur-md rounded-full"></div>
                   <div className="relative text-3xl text-stone-400 font-serif border border-stone-700/50 rounded-full w-14 h-14 flex items-center justify-center bg-[#151413] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-stone-600">合</span>
                   </div>
                 </div>
                 <div className="w-24 h-[1px] md:w-[1px] md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
              </div>

              <ImageUpload 
                gender={Gender.FEMALE} 
                image={femaleImage} 
                onUpload={setFemaleImage} 
                onClear={() => setFemaleImage(null)} 
              />
            </div>

            <div className="text-center mt-24">
              <button
                onClick={handleAnalyze}
                disabled={!maleImage || !femaleImage || loading}
                className={`
                  relative group overflow-hidden px-24 py-5 text-xl font-bold tracking-[0.4em] transition-all duration-700 rounded-[2px]
                  ${!maleImage || !femaleImage 
                    ? 'bg-stone-900/50 text-stone-700 cursor-not-allowed border border-stone-800' 
                    : 'text-amber-100 border border-amber-800/50 shadow-[0_0_20px_rgba(146,64,14,0.15)] hover:shadow-[0_0_40px_rgba(146,64,14,0.3)]'}
                `}
              >
                {!maleImage || !femaleImage ? (
                   <span>开启合盘</span>
                ) : (
                  <>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
                    <span className="relative z-10 drop-shadow-md">{loading ? "推演天机中..." : "开启合盘"}</span>
                  </>
                )}
              </button>
              {error && <p className="mt-8 text-red-400/70 text-sm tracking-widest font-light">{error}</p>}
            </div>
          </section>

          {/* Results Section */}
          {result && (
            <div ref={resultRef} className="animate-fadeIn space-y-20 pt-12 border-t border-stone-800/30 relative">
              
              {/* Decorative Divider Symbol */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-stone-700 text-2xl">
                ◈
              </div>

              {/* Header for Result */}
              <div className="text-center pb-4">
                <h2 className="text-3xl font-serif text-stone-200 tracking-[0.2em] inline-flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-800/50"></span>
                  合盘总评 
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-800/50"></span>
                </h2>
              </div>

              {/* Row 1: Score */}
              <div className="flex justify-center">
                <div className="w-full max-w-xl flex flex-col items-center justify-center bg-[#141210]/80 backdrop-blur-sm border border-stone-800 p-12 relative overflow-hidden group shadow-2xl">
                  {/* Corner Ornaments */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-stone-600/50"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-stone-600/50"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-stone-600/50"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-stone-600/50"></div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.08)_0%,transparent_60%)]"></div>
                  
                  {/* Score Circle */}
                  <div className="relative w-52 h-52 flex items-center justify-center mb-8">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full border border-amber-900/20 scale-110"></div>
                    
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="104" cy="104" r="96" stroke="#292524" strokeWidth="1" fill="none" opacity="0.5" />
                      <circle 
                        cx="104" cy="104" r="96" 
                        stroke="url(#gradientScore)" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeDasharray={603} 
                        strokeDashoffset={603 - (603 * result.matchScore) / 100} 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(217,119,6,0.4)]"
                      />
                      <defs>
                        <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#92400e" />
                          <stop offset="50%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#fcd34d" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="text-center z-10 flex flex-col items-center">
                      <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-800 font-serif leading-none">
                        {result.matchScore}
                      </div>
                      <div className="text-xs text-stone-500 tracking-[0.4em] mt-3 uppercase border-t border-stone-800 pt-2 w-full">MATCH</div>
                    </div>
                  </div>

                  <div className="text-center relative z-10 w-full">
                    <div className="text-2xl text-amber-100/90 font-serif tracking-widest mb-4">{result.scoreReason}</div>
                    <div className="flex justify-center items-center gap-2 opacity-50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Pros & Cons */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pros */}
                <div className="bg-[#141210]/60 border border-emerald-900/20 p-8 hover:bg-[#1c1917]/80 transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <h3 className="flex items-center gap-4 text-emerald-600/90 font-serif text-xl mb-8 tracking-widest border-b border-stone-800/50 pb-4">
                    <span className="text-lg border border-emerald-900/30 rounded-full w-10 h-10 flex items-center justify-center bg-emerald-900/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]">吉</span>
                    命理利好
                  </h3>
                  <ul className="space-y-6">
                    {result.pros.map((pro, idx) => (
                      <li key={idx} className="relative pl-8 text-stone-300 font-light leading-7 text-justify group/item">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rotate-45 bg-emerald-800/60 group-hover/item:bg-emerald-500/60 transition-colors"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-[#141210]/60 border border-red-900/20 p-8 hover:bg-[#1c1917]/80 transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <h3 className="flex items-center gap-4 text-red-400/80 font-serif text-xl mb-8 tracking-widest border-b border-stone-800/50 pb-4">
                    <span className="text-lg border border-red-900/30 rounded-full w-10 h-10 flex items-center justify-center bg-red-900/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]">凶</span>
                    潜在危机
                  </h3>
                  <ul className="space-y-6">
                    {result.cons.map((con, idx) => (
                      <li key={idx} className="relative pl-8 text-stone-300 font-light leading-7 text-justify group/item">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rotate-45 bg-red-900/60 group-hover/item:bg-red-500/60 transition-colors"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Row 3: Chart */}
              <div className="bg-[#141210] border border-stone-800 p-10 flex flex-col items-center relative shadow-lg">
                 <div className="absolute top-4 left-4 text-stone-800 text-4xl opacity-20 font-serif">☰</div>
                 <div className="absolute bottom-4 right-4 text-stone-800 text-4xl opacity-20 font-serif">☷</div>
                 
                 <h3 className="text-center text-stone-500 text-sm tracking-[0.4em] mb-10 font-bold">
                    <span className="text-amber-900 mx-2">―</span> 六维图谱对比 <span className="text-amber-900 mx-2">―</span>
                 </h3>
                 <div className="w-full max-w-lg relative z-10">
                    <DimensionChart maleData={result.male} femaleData={result.female} />
                 </div>
              </div>

              {/* Row 4: Detailed Analysis */}
              <div className="grid md:grid-cols-2 gap-8">
                 <DetailedResult gender={Gender.MALE} analysis={result.male} />
                 <DetailedResult gender={Gender.FEMALE} analysis={result.female} />
              </div>

              {/* Action Buttons: Share & Test Again */}
              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 pt-20 pb-12 items-center">
                <button 
                  onClick={handleShare}
                  className="w-64 group flex items-center justify-center gap-4 px-8 py-4 text-stone-500 hover:text-amber-100 transition-colors tracking-[0.2em] text-sm uppercase border border-transparent hover:border-amber-900/30 hover:bg-amber-900/10 rounded-sm"
                >
                  {copied ? (
                     <>
                       <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                       </svg>
                       <span className="text-emerald-500/80">已复制网址</span>
                     </>
                  ) : (
                     <>
                       <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-700 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                       </svg>
                       分享网址
                     </>
                  )}
                </button>

                <button 
                  onClick={reset}
                  className="w-64 group flex items-center justify-center gap-4 px-8 py-4 text-stone-500 hover:text-amber-100 transition-colors tracking-[0.2em] text-sm uppercase border border-transparent hover:border-amber-900/30 hover:bg-amber-900/10 rounded-sm"
                >
                  <svg className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-700 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  再次测算
                </button>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;