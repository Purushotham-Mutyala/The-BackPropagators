import React, { useEffect, useRef, useState } from 'react';
import { FurnitureProduct } from '../../types/furniture';

interface ARViewerProps {
  product: FurnitureProduct;
  scale: number;
  isRotating: boolean;
}

const ARViewer: React.FC<ARViewerProps> = ({ product, scale, isRotating }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize camera
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setTimeout(() => setIsLoading(false), 1000);
          }
        } else {
          console.error('getUserMedia not supported');
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      // Clean up camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // In a real app, we would render a 3D model on top of the camera feed
  // This is a simplified version showing just the camera feed with a placeholder

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}
      
      <video 
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover"
      />
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div 
          className="relative transform transition-all duration-300"
          style={{ 
            transform: `scale(${scale})`,
            animation: isRotating ? 'spin 4s linear infinite' : 'none'
          }}
        >
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="max-h-[50vh] max-w-[50vw] object-contain"
            style={{ opacity: 0.8 }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-24 left-0 right-0 text-center">
        <div className="inline-block bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
          <p>Move your phone to place the furniture</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: scale(${scale}) rotateY(0deg); }
          to { transform: scale(${scale}) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ARViewer;