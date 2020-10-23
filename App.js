import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, AsyncStorage } from 'react-native';
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import AccessScreen from "./screens/Access";
import MoreScreen from "./screens/More";
import AddScreen from "./screens/Add";

const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor ="#0B3967"
                barStyle="light-content"
            />
            <Stack.Navigator> 
                <Stack.Screen
                    options={{headerShown: false}}
                    name="Login"
                    component={LoginScreen}
                />
                
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{
                        title: 'AccShares',
                        headerStyle: {
                            backgroundColor: '#0B3967',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="Access" 
                    component={AccessScreen}
                    options={{
                        title: 'AccShares',
                        headerStyle: {
                            backgroundColor: '#0B3967',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="More" 
                    component={MoreScreen}
                    options={{
                        title: 'AccShares',
                        headerStyle: {
                            backgroundColor: '#0B3967',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                    }} 
                />
                <Stack.Screen 
                    name="Add" 
                    component={AddScreen}
                    options={{
                        title: 'AccShares',
                        headerStyle: {
                            backgroundColor: '#0B3967',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


