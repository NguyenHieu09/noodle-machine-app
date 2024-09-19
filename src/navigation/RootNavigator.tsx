// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import UserInfo from '../screens/userInfo/UserInfo';

export type RootStackParamList = {
    Home: undefined;
    UserInfo: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UserInfo" component={UserInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;