import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { app } from '../../../firebaseConfig'; // Import the Firebase app
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux-toolkit/store';
import { useDispatch } from 'react-redux';
import { fetchUserById, updateUserCupNoodles } from '@/src/redux-toolkit/slices/userSlice';

type UserInfoRouteProp = RouteProp<RootStackParamList, 'UserInfo'>;

interface UserInfoProps {
    route: UserInfoRouteProp;
}

const UserInfo: React.FC<UserInfoProps> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { userId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [selectedCups, setSelectedCups] = useState<number>(0);
    const updateStatus = useSelector((state: RootState) => state.user.status);

    const handlePress = (index: number) => {
        setSelectedIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );

        setSelectedCups(prevCups =>
            selectedIndices.includes(index) ? prevCups - 1 : prevCups + 1
        );
    };

    const handleGetNoodles = () => {
        if (selectedCups > 0) {
            dispatch(updateUserCupNoodles({ userId, cupsToBuy: selectedCups }));
            navigation.navigate('Done');
        }
    };

    useEffect(() => {
        console.log(userId);
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);

    if (!userInfo) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Thông tin người dùng</Text>
                <Text style={styles.info}>Không có thông tin người dùng</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../../assets/image/bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.centeredContainer}>
                <Image
                    source={require('../../../assets/image/Group (1).png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.welcomeText}>infomation</Text>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.whiteBorder}>
                    <View style={styles.outerBorder}>
                        <View style={styles.infomation}>
                            <View style={styles.column}>
                                <Image
                                    source={require('../../../assets/image/Frame 3.png')}
                                    style={styles.avatar}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.infoBold}>Tên:</Text>
                                <Text style={styles.infoBold}>Ngày sinh:</Text>
                                <Text style={styles.infoBold}>Giới tính:</Text>
                                <Text style={styles.infoBold}>Phòng ban:</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.info}>{userInfo.fullName}</Text>
                                <Text style={styles.info}>{userInfo.birthday}</Text>
                                <Text style={styles.info}>{userInfo.gender}</Text>
                                <Text style={styles.info}>{userInfo.department}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infomation}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => handlePress(0)}>
                            <View style={styles.imageContainer}>
                                {selectedIndices.includes(0) && (
                                    <Image
                                        source={require('../../../assets/image/choise.png')}
                                        style={[styles.choice, { zIndex: 1 }]}
                                        resizeMode="contain"
                                    />
                                )}
                                <Image
                                    source={require('../../../assets/image/Group.png')}
                                    style={[styles.noodle, { zIndex: 2 }]}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => handlePress(1)}>
                            <View style={styles.imageContainer}>
                                {selectedIndices.includes(1) && (
                                    <Image
                                        source={require('../../../assets/image/choise.png')}
                                        style={[styles.choice, { zIndex: 1 }]}
                                        resizeMode="contain"
                                    />
                                )}
                                <Image
                                    source={require('../../../assets/image/Group02.png')}
                                    style={[styles.noodle, { zIndex: 2 }]}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => handlePress(2)}>
                            <View style={styles.imageContainer}>
                                {selectedIndices.includes(2) && (
                                    <Image
                                        source={require('../../../assets/image/choise.png')}
                                        style={[styles.choice, { zIndex: 1 }]}
                                        resizeMode="contain"
                                    />
                                )}
                                <Image
                                    source={require('../../../assets/image/Group03.png')}
                                    style={[styles.noodle, { zIndex: 2 }]}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.centeredContainer}>
                <Text style={styles.number}>
                    <Text style={styles.cupNoodles}>{userInfo.cupNoodles}</Text>
                    <Text style={styles.grayText}> cups of noodles left this month</Text>
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleGetNoodles}>
                    <LinearGradient
                        colors={['#FFB706', '#FF7506']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Get your noodles</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    centeredContainer: {
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
    },
    whiteBorder: {
        margin: 20,
        borderWidth: 10,
        borderColor: '#FFFFFF',
        borderRadius: 10,
    },
    outerBorder: {
        borderWidth: 1,
        borderColor: '#711F1F',
        borderRadius: 8,
    },
    infomation: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        textAlign: 'left',
        fontSize: 15,
        color: '#880B0B',
    },
    infoBold: {
        fontWeight: 'bold',
        color: '#880B0B',
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    avatar: {
        width: 66,
        height: 66,
        alignSelf: 'center',
    },
    noodle: {
        height: 110,
        alignSelf: 'center',
    },
    choice: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#c0392b',
        textTransform: 'uppercase',
    },
    number: {
        fontSize: 12,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    cupNoodles: {
        color: 'red',
    },
    grayText: {
        color: 'gray',
    },
    button: {
        marginTop: 20,
        marginBottom: 120,
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng đổ
        shadowOpacity: 0.25, // Độ mờ của bóng đổ
        shadowRadius: 3.84, // Bán kính của bóng đổ
        elevation: 5, // Độ cao của bóng đổ (chỉ dành cho Android)
    },
    gradient: {
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 56,
    },
    buttonText: {
        color: '#A31616',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',  // Căn giữa theo chiều dọc
        alignItems: 'center',
    },
});

export default UserInfo;