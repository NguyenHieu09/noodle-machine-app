import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedArrow = () => {
    const moveAnim = useRef(new Animated.Value(0)).current; // Giá trị khởi tạo của animation

    // Hàm để bắt đầu hiệu ứng di chuyển
    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: 100,  // Điểm kết thúc của animation
                    duration: 1000, // Thời gian chạy animation
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,  // Quay lại vị trí ban đầu
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        startAnimation(); // Gọi hiệu ứng ngay khi component được render
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateX: moveAnim }] }}> {/* View với hiệu ứng di chuyển */}
                <Ionicons name="arrow-forward" size={40} color="black" />
            </Animated.View>
            <Button title="Start Animation" onPress={startAnimation} /> {/* Nút để bắt đầu lại hiệu ứng */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimatedArrow;