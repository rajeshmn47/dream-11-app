import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import DetailsScreen from '../DetailsScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import CreateTeam from '../CreateTeam';
import SelectCaptain from '../Captain';
import ContestDetail from '../ContestDetail';
import MyMatches from '../MyMatches';
import EntryScreen from '../entry/Entry';
import EditTeam from '../EditTeam';
import Withdraw from '../Withdraw';
import UserBankAccount from '../UserBankAccount';
import UserProfile from '../UserProfile';
import KYC from '../sidebar/KYC';

const Stack = createStackNavigator<RootStackParamList>();


export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
}

export default function MyStackNavigator() {
    const dispatch = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
        <>
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10
    },
    match: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 15,
        borderRadius: 10,
        height: 150,
        backgroundColor: 'white'
    },
    team: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: 40
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        height: 50,
        padding: 10
    },
    stretch: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 10,
        borderRadius: 2,
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    date: {
        fontSize: 10
    }
});