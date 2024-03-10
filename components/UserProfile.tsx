import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from "../utils/dateFormat";
import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../actions/userAction';

export type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;

export default function UserProfile() {
    const { userToken, user } = useSelector((state: any) => state.user);
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text>{user?.username}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    dot: {
        borderRadius: 5,
        backgroundColor: '#FAFAFA',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 10,
        width: 10,
        marginRight: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#990000"
    }
})