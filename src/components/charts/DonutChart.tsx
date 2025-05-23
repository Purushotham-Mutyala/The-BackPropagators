import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DataPoint {
  value: number;
  color: string;
  label: string;
}

const DonutChart: React.FC = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data: DataPoint[] = [
    { value: 45, color: '#EF4444', label: 'Phishing' },
    { value: 25, color: '#3B82F6', label: 'Malware' },
    { value: 20, color: '#F59E0B', label: 'Scam' },
    { value: 10, color: '#8B5CF6', label: 'Other' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Chart dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.6; // For donut hole
    
    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Draw donut chart
    let startAngle = -0.5 * Math.PI; // Start at top
    
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Add border
      ctx.strokeStyle = isDarkMode ? '#1F2937' : '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      startAngle += sliceAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 1, 0, 2 * Math.PI);
    ctx.fillStyle = isDarkMode ? '#1F2937' : '#FFFFFF';
    ctx.fill();
    
    // Add total count in center
    ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#111827';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY - 10);
    
    ctx.font = '12px sans-serif';
    ctx.fillStyle = isDarkMode ? '#9CA3AF' : '#6B7280';
    ctx.fillText('Total Threats', centerX, centerY + 10);

  }, [isDarkMode, data]);

  return (
    <canvas 
      ref={canvasRef} 
      width={250} 
      height={250} 
      className="w-full max-w-xs mx-auto"
    />
  );
};

export default DonutChart;