// src/components/userScanner/UserScanner.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../../redux-toolkit/slices/userSlice';
import { AppDispatch } from '../../redux-toolkit/store';
import { CameraView } from 'expo-camera';
import useUserScanner from '../../hook/useUserScanner';

interface UserScannerProps {
    onScanSuccess: (userId: string) => void;
}

const UserScanner: React.FC<UserScannerProps> = ({ onScanSuccess }) => {
    const {
        facing,
        permission,
        requestPermission,
        scanned,
        setScanned,
        toggleCameraFacing,
    } = useUserScanner();
    const dispatch = useDispatch<AppDispatch>();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Chúng tôi cần quyền truy cập camera để quét mã</Text>
                <Button onPress={requestPermission} title="Cấp quyền" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        console.log("QR Code Scanned: ", data);  // Kiểm tra dữ liệu của mã QR
        setScanned(true);
        dispatch(fetchUserById(data));
        onScanSuccess(data); // Gọi hàm onScanSuccess từ props
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Đổi camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
            {scanned && (
                <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
                    <Text style={styles.scanAgainText}>Quét lại</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Đảm bảo nền trắng để chữ dễ đọc
    },
    message: {
        textAlign: 'center',
        paddingBottom: 20, // Tăng khoảng cách dưới
        fontSize: 18, // Đảm bảo kích thước chữ đủ lớn để dễ đọc
        color: '#333', // Đảm bảo màu chữ đủ tương phản với nền
    },
    camera: {
        flex: 1,
        width: '100%',
        maxHeight: '70%', // Giới hạn chiều cao của camera
        aspectRatio: 1, // Đảm bảo tỷ lệ khung hình của camera
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
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