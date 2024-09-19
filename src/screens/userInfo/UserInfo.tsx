// src/screens/UserInfo.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { app } from '../../../firebaseConfig'; // Import the Firebase app

type UserInfoRouteProp = RouteProp<RootStackParamList, 'UserInfo'>;

interface UserInfoProps {
    route: UserInfoRouteProp;
}

const UserInfo: React.FC<UserInfoProps> = ({ route }) => {
    const { userId } = route.params;
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const firestore = getFirestore(app); // Initialize Firestore
            const userDoc = await getDoc(doc(firestore, 'users', userId));
            if (userDoc.exists()) {
                setUserInfo(userDoc.data());
            }
        };

        fetchUserInfo();
    }, [userId]);

    if (!userInfo) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Thông tin người dùng</Text>
                <Text style={styles.info}>Không có thông tin người dùng</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin người dùng</Text>
            <Text style={styles.info}>Tên: {userInfo.fullName}</Text>
            <Text style={styles.info}>Ngày sinh: {userInfo.birthday}</Text>
            <Text style={styles.info}>Giới tính: {userInfo.gender}</Text>
            <Text style={styles.info}>Phòng ban: {userInfo.department}</Text>
            {/* Thêm các thông tin khác nếu cần */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default UserInfo;