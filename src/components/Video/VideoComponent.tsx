import React from 'react';
import { View, StyleSheet } from 'react-native';

const SquareOverlay: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* White square background */}
            <View style={styles.whiteSquare}>
                {/* Yellow square centered inside the white square */}
                <View style={styles.yellowSquare} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Background color for visibility
    },
    whiteSquare: {
        width: 300, // Size of the white square
        height: 300,
        backgroundColor: '#FFFFFF', // White color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10 // Border width
    },
    yellowSquare: {
        width: 150, // Size of the yellow square (smaller than white)
        height: 150,
        backgroundColor: '#FFCC00', // Yellow color
    },
});

export default SquareOverlay;
