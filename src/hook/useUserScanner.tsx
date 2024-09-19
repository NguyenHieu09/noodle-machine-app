// src/hooks/useUserScanner.tsx
import { useState } from 'react';
import { CameraType, useCameraPermissions } from 'expo-camera';

const useUserScanner = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return {
        facing,
        permission,
        requestPermission,
        scanned,
        setScanned,
        toggleCameraFacing,
    };
};

export default useUserScanner;