import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const LineChart: React.FC = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Chart dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Sample data - daily threat counts for a month
    const data = [5, 8, 10, 7, 12, 15, 18, 16, 14, 12, 10, 8, 6, 5, 7, 9, 12, 14, 13, 11, 9, 7, 6, 8, 10, 13, 15, 16, 14, 12];
    const maxValue = Math.max(...data) * 1.2; // Add some padding to the top

    // Draw axes
    ctx.strokeStyle = isDarkMode ? '#4B5563' : '#E5E7EB';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw grid lines (horizontal)
    ctx.strokeStyle = isDarkMode ? '#374151' : '#F3F4F6';
    ctx.lineWidth = 1;
    
    const gridCount = 5;
    for (let i = 1; i <= gridCount; i++) {
      const y = padding + (chartHeight / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(padding, height - y);
      ctx.lineTo(width - padding, height - y);
      ctx.stroke();
      
      // Y-axis labels
      ctx.fillStyle = isDarkMode ? '#9CA3AF' : '#6B7280';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round((maxValue / gridCount) * (gridCount - i)).toString(), padding - 10, height - y + 4);
    }

    // X-axis labels (just show every 5th day for simplicity)
    ctx.fillStyle = isDarkMode ? '#9CA3AF' : '#6B7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < data.length; i += 5) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      ctx.fillText(`Day ${i + 1}`, x, height - padding + 15);
    }

    // Draw data line
    ctx.strokeStyle = '#10B981'; // Emerald color
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = height - padding - (data[i] / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();

    // Add gradient fill below the line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)');
    gradient.addColorStop(1, isDarkMode ? 'rgba(16, 185, 129, 0.0)' : 'rgba(16, 185, 129, 0.0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    // Start from the bottom left
    ctx.moveTo(padding, height - padding);
    
    // Draw the line again
    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = height - padding - (data[i] / maxValue) * chartHeight;
      ctx.lineTo(x, y);
    }
    
    // Complete the path to the bottom right and fill
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#10B981';
    
    for (let i = 0; i < data.length; i += 5) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = height - padding - (data[i] / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = isDarkMode ? '#1F2937' : '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.stroke();
    }

  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={300} 
      className="w-full h-64"
    />
  );
};

export default LineChart;