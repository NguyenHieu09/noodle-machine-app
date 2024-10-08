// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import UserInfo from '../screens/userInfo/UserInfo';
// import AnimatedArrow from '../screens/home/AnimatedArrow';
import Done from '../screens/done/Done';
import Error from '../components/Error/Error';
import SquareOverlay from '../components/Video/VideoComponent';
import OutOfNoodlesScreen from '../screens/OutOfNoodles/OutOfNoodlesScreen';
// import VideoComponent from '../components/Video/VideoComponent';
// import AnimatedArrow from '../screens/home/AnimatedArrow';

export type RootStackParamList = {
    Home: undefined;
    UserInfo: { userId: string };
    AnimatedArrow: undefined;
    Done: undefined,
    Error: undefined,
    SquareOverlay: undefined,
    OutOfNoodlesScreen: undefined,
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserInfo"
                    component={UserInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OutOfNoodlesScreen"
                    component={OutOfNoodlesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Done"
                    component={Done}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Error"
                    component={Error}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;