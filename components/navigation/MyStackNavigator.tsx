import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getDisplayDate } from '../../utils/dateFormat';
import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import DetailsScreen from '../DetailsScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import LoginScreen from '../auth/Login';
import RegisterScreen from '../auth/Register';
import { loadToken, loadUser } from '../../actions/userAction';
import CreateTeam from '../CreateTeam';
import SelectCaptain from '../Captain';
import ContestDetail from '../ContestDetail';
import MyMatches from '../MyMatches';
import EntryScreen from '../entry/Entry';
import Payment from '../Payment';
import Balance from "../Balance";
import Winners from '../winners/Winners';
import Community from "../community/Community"
import Settings from '../sidebar/Settings';
import HowToPlay from '../sidebar/HowToPlay';
import TermsandConditions from '../sidebar/TermsandConditions';
import Help from '../sidebar/Help';
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
            {userToken == null ? (
                // No token found, user isn't signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Entry" component={EntryScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                // User is signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MyMatches" component={MyMatches} options={{ headerShown: false }} />
                        <Stack.Screen name="Detail" component={DetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="UserProfile" component={UserProfile} />
                        <Stack.Screen name="Create" component={CreateTeam} />
                        <Stack.Screen name="Edit" component={EditTeam} />
                        <Stack.Screen name="Captain" component={SelectCaptain} />
                        <Stack.Screen name="ConDetail" component={ContestDetail} />
                        <Stack.Screen name="Payment" component={Payment} />
                        <Stack.Screen name="Balance" component={Balance} />
                        <Stack.Screen name="Bank" component={UserBankAccount} />
                        <Stack.Screen name="Withdraw" component={Withdraw} />
                        <Stack.Screen name="Winners" component={Winners} />
                        <Stack.Screen name="Community" component={Community} />
                        <Stack.Screen name="Settings" component={Settings} />
                        <Stack.Screen name="HowToPlay" component={HowToPlay} options={{ headerShown: false }} />
                        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
                        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
                        <Stack.Screen name="Kyc" component={KYC} options={{ headerShown: true }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
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