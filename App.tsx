import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import { getDisplayDate } from './utils/dateFormat';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import DetailsScreen from './components/DetailsScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import LoginScreen from './components/auth/Login';
import RegisterScreen from './components/auth/Register';
import Routes from './components/routing/Routes';
import { loadToken } from './actions/userAction';
import { AlertNotificationRoot } from 'react-native-alert-notification';
LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
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

export type RootStackParamList = {
  Entry: undefined;
  Home: undefined;
  Detail: { matchId: string };
  Login: undefined,
  Post: undefined;
  Register: undefined,
  Create: { matchId: string, editMode: Boolean, data: any },
  Edit: { matchId: string, editMode: Boolean, data: any },
  Routes: undefined,
  Captain: { players: any[], matchId: string, team: any, editMode: Boolean },
  ConDetail: { contestId: string, contest: any, matchId: string },
  MyMatches: { userId: string }
  Payment: undefined,
  Balance: undefined,
  Winners: undefined,
  Community: undefined,
  Settings: undefined,
  HowToPlay: undefined,
  TermsandConditions: undefined,
  Help: undefined,
  Withdraw: undefined,
  View: { match: any, team: any, data: any },
  Bank: undefined,
  UserProfile: undefined,
  Kyc: undefined
};

export default function App() {
  return (
    <PaperProvider>
      <AlertNotificationRoot>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Routes />
          </PersistGate>
        </Provider>
      </AlertNotificationRoot>
    </PaperProvider>
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
