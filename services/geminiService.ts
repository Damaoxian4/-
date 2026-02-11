import { GoogleGenAI } from "@google/genai";
import { RelationshipAnalysis } from "../types";

const SYSTEM_PROMPT = `
你是一位精通《麻衣神相》、《柳庄相法》与现代心理学的面相情感合盘大师。你的分析风格一针见血，逻辑严密，不盲目吹捧，也不危言耸听。

任务：根据男女方面部照片进行深度情感匹配分析。

### 核心要求 (Crucial):
1. **拒绝通过式高分**：分数必须服从正态分布。
   - 90-99分：天作之合（五官完美互补，气场极度和谐）。
   - 75-89分：良缘（大部分匹配，有小摩擦）。
   - 60-74分：中平（需要磨合，运势互补性一般）。
   - 40-59分：下格（性格或运势存在明显冲突）。
   - <40分：刑克（面相严重不合）。
2. **有理有据**：在分析中**必须**引用具体的面相特征。例如：“男方眉骨突出，性格刚强...” 或 “女方人中深长，子息运旺...”。不要只说空话。
3. **合盘逻辑**：关注互补与冲突。例如：男方颧骨高（掌控欲）配女方眼神柔和（包容）为吉；若双方都颧骨横张，则为凶（互不相让）。

### 输出格式 (JSON Only):
严格按照以下JSON格式输出，不要包含Markdown标记：

{
  "matchScore": number, // 2-99
  "scoreReason": "string", // 15字以内，如“乾坤正配，富贵双全”或“龙虎相争，必有一伤”。
  "pros": [
    "string", // 第一条利好：结合具体的面相特征分析（如：男方天庭饱满配女方地阁方圆...）
    "string"  // 第二条利好
  ],
  "cons": [
    "string", // 第一条隐患：结合具体的面相特征分析（如：男方眼神游离...）
    "string"  // 第二条隐患
  ],
  "male": {
    "overallFortune": "string", // 100字左右的综合运势评语
    "tianting": { "score": number, "analysis": "string" }, // 天庭：具体分析额头形状、发际线
    "mushen": { "score": number, "analysis": "string" },   // 目神：具体分析眼神强弱、眼型
    "shoutang": { "score": number, "analysis": "string" }, // 寿堂：具体分析人中、法令纹
    "quangu": { "score": number, "analysis": "string" },   // 颧骨：具体分析颧骨高低、有肉无肉
    "hanlu": { "score": number, "analysis": "string" },    // 含露：具体分析嘴唇厚薄、嘴角形态
    "caibo": { "score": number, "analysis": "string" }     // 财帛：具体分析鼻梁高低、鼻头大小
  },
  "female": {
    "overallFortune": "string",
    "tianting": { "score": number, "analysis": "string" },
    "mushen": { "score": number, "analysis": "string" },
    "shoutang": { "score": number, "analysis": "string" },
    "quangu": { "score": number, "analysis": "string" },
    "hanlu": { "score": number, "analysis": "string" },
    "caibo": { "score": number, "analysis": "string" }
  }
}
`;

// Simple in-memory cache to store results for image pairs
const resultCache = new Map<string, RelationshipAnalysis>();

const generateCacheKey = (male: string, female: string) => {
  return `${male.length}:${male.slice(-30)}|${female.length}:${female.slice(-30)}`;
};

/**
 * 获取 API Key
 * 支持 VITE_GEMINI_API_KEY 和 GEMINI_API_KEY
 */
const getApiKey = (): string | undefined => {
  let key: string | undefined = undefined;

  // 1. Try Vite (import.meta.env)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    key = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_API_KEY;
  }
  
  // 2. Try Standard Process Env (fallback)
  if (!key && typeof process !== 'undefined' && process.env) {
    key = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
  }

  return key ? key.trim() : undefined;
};

export const analyzeFaces = async (
  maleBase64: string,
  femaleBase64: string
): Promise<RelationshipAnalysis> => {
  const cacheKey = generateCacheKey(maleBase64, femaleBase64);
  if (resultCache.has(cacheKey)) {
    return resultCache.get(cacheKey)!;
  }

  const apiKey = getApiKey();

  // Debug log (will show in browser console)
  console.log("API Key Status:", apiKey ? "Loaded (Starts with " + apiKey.substring(0, 4) + "...)" : "Not Found");

  if (!apiKey) {
    throw new Error(
      "API Key missing. Please set 'VITE_GEMINI_API_KEY' in Netlify Environment Variables AND Redeploy."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const cleanMale = maleBase64.replace(/^data:image\/\w+;base64,/, "");
    const cleanFemale = femaleBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanMale } },
          { text: "这是男方 (乾造) 的照片。" },
          { inlineData: { mimeType: 'image/jpeg', data: cleanFemale } },
          { text: "这是女方 (坤造) 的照片。请根据面相特征进行严谨、真实的合盘分析。" }
        ]
      },
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.6,
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      }
    });

    const text = response.text;
    if (!text) throw new Error("API returned empty response");

    const result = JSON.parse(text) as RelationshipAnalysis;
    resultCache.set(cacheKey, result);

    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
