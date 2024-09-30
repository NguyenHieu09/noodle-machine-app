import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../../redux-toolkit/slices/userSlice';
import { AppDispatch } from '../../redux-toolkit/store';
import { CameraView } from 'expo-camera';
import useUserScanner from '../../hook/useUserScanner';

interface UserScannerProps {
    style?: ViewStyle;
    onScanSuccess: (data: string) => void;
    hasError: boolean; // Prop to determine if there is an error
}

const UserScanner: React.FC<UserScannerProps> = ({ style, onScanSuccess, hasError }) => {
    const { facing, permission, requestPermission, scanned, setScanned } = useUserScanner();
    const dispatch = useDispatch<AppDispatch>();

    // Reset the scanned state when there is an error to allow scanning again
    useEffect(() => {
        if (hasError) {
            setScanned(false); // Reset the scanner to scan again if there's an error
        }
    }, [hasError]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, style]}>
                <Button onPress={requestPermission} title="Cấp quyền" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        console.log("QR Code Scanned: ", data);
        setScanned(true);
        dispatch(fetchUserById(data));
        onScanSuccess(data);

        // Automatically reset scanned state after 2 seconds
        setTimeout(() => setScanned(false), 2000);
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        borderWidth: 15,
        borderColor: '#fff',
        borderRadius: 10,
        width: 100,
        height: 130,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default UserScanner;
