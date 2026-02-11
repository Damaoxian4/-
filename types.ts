export interface DimensionScore {
  score: number; // 0-100
  analysis: string;
}

export interface FaceAnalysis {
  tianting: DimensionScore; // 天庭
  mushen: DimensionScore;   // 目神
  shoutang: DimensionScore; // 寿堂
  quangu: DimensionScore;   // 颧骨
  hanlu: DimensionScore;    // 含露
  caibo: DimensionScore;    // 财帛
  overallFortune: string;   // 个人整体运势
}

export interface RelationshipAnalysis {
  matchScore: number;       // 2-99
  scoreReason: string;
  pros: string[];           // 利好
  cons: string[];           // 危机
  male: FaceAnalysis;
  female: FaceAnalysis;
}

export interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string;
}

export enum Gender {
  MALE = '男方面部照片',
  FEMALE = '女方面部照片'
}