import React from 'react';
import { Camera } from 'lucide-react';

interface CameraPermissionPromptProps {
  onPermissionChange: (granted: boolean) => void;
}

const CameraPermissionPrompt: React.FC<CameraPermissionPromptProps> = ({ onPermissionChange }) => {
  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      onPermissionChange(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      onPermissionChange(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-neutral-900 text-white p-6">
      <div className="text-center max-w-md">
        <Camera className="h-12 w-12 mx-auto mb-4 text-primary-500" />
        <h2 className="text-2xl font-bold mb-4">Camera Access Required</h2>
        <p className="mb-6">
          To visualize furniture in your space, AR Furnish needs access to your camera. Your privacy is important to us and we only use the camera feed for AR visualization.
        </p>
        <button 
          onClick={requestCameraPermission}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md"
        >
          Allow Camera Access
        </button>
      </div>
    </div>
  );
};

export default CameraPermissionPrompt;