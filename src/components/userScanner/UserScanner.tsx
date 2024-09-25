import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../../redux-toolkit/slices/userSlice';
import { AppDispatch } from '../../redux-toolkit/store';
import { CameraView } from 'expo-camera';
import useUserScanner from '../../hook/useUserScanner';

interface UserScannerProps {
    style?: ViewStyle;
    onScanSuccess: (data: string) => void;
}

const UserScanner: React.FC<UserScannerProps> = ({ style, onScanSuccess }) => {
    const {
        facing,
        permission,
        requestPermission,
        scanned,
        setScanned,
    } = useUserScanner();
    const dispatch = useDispatch<AppDispatch>();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, style]}>
                <Text style={styles.message}>Chúng tôi cần quyền truy cập camera để quét mã</Text>
                <Button onPress={requestPermission} title="Cấp quyền" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        console.log("QR Code Scanned: ", data);
        setScanned(true);
        dispatch(fetchUserById(data));
        onScanSuccess(data);
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                />
                {scanned && (
                    <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
                        <Text style={styles.scanAgainText}>Quét lại</Text>
                    </TouchableOpacity>
                )}
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
        borderWidth: 15, // Độ dày viền trắng
        borderColor: '#fff', // Màu viền trắng
        borderRadius: 10,
        width: 100, // Chiều rộng của camera
        height: 130, // Chiều cao của camera
        justifyContent: 'center', // Căn giữa camera
        overflow: 'hidden', // Đảm bảo không có gì ra ngoài viền
    },
    message: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 18,
        color: '#333',
    },
    camera: {
        flex: 1,
        width: '100%', // Chiều rộng của camera
        height: '100%', // Chiều cao của camera
    },
    scanAgainButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    scanAgainText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserScanner;