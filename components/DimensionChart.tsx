import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { FaceAnalysis } from '../types';

interface DimensionChartProps {
  maleData: FaceAnalysis;
  femaleData: FaceAnalysis;
}

const DimensionChart: React.FC<DimensionChartProps> = ({ maleData, femaleData }) => {
  
  const data = [
    { subject: '天庭', A: maleData.tianting.score, B: femaleData.tianting.score, fullMark: 100 },
    { subject: '目神', A: maleData.mushen.score, B: femaleData.mushen.score, fullMark: 100 },
    { subject: '寿堂', A: maleData.shoutang.score, B: femaleData.shoutang.score, fullMark: 100 },
    { subject: '颧骨', A: maleData.quangu.score, B: femaleData.quangu.score, fullMark: 100 },
    { subject: '含露', A: maleData.hanlu.score, B: femaleData.hanlu.score, fullMark: 100 },
    { subject: '财帛', A: maleData.caibo.score, B: femaleData.caibo.score, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#292524" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 12, fontFamily: 'serif' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          {/* Male - Sky Blue Muted */}
          <Radar
            name="男方"
            dataKey="A"
            stroke="#0369a1"
            strokeWidth={1.5}
            fill="#0369a1"
            fillOpacity={0.15}
          />
          
          {/* Female - Rose Red Muted */}
          <Radar
            name="女方"
            dataKey="B"
            stroke="#be123c"
            strokeWidth={1.5}
            fill="#be123c"
            fillOpacity={0.15}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'serif', color: '#78716c' }} 
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DimensionChart;