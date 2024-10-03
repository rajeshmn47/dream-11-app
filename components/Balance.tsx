import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../actions/userAction';


export type Props = NativeStackScreenProps<RootStackParamList, "Balance">;
const { width, height } = Dimensions.get('window');

const Balance = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();

    return (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.SectionStyle}>
                <Text style={{ fontWeight: "200", color: "#212121", textAlign: "center" }}>
                    Current Balance
                </Text>
                <Text style={{ fontWeight: "600", color: "#212121", marginTop: 5, textAlign: "center" }}>
                    ₹{user?.wallet}
                </Text>
            </View>
            <View style={{ width: width, paddingHorizontal: 35, marginTop: 5 }}>
                <Button title="Add Cash" onPress={() => navigation.navigate("Payment")} color="#4c9452" />
            </View>
            <View style={{ width: width, paddingHorizontal: 35, marginTop: 20 }}>
                <Button title="Withdraw" onPress={() => navigation.navigate("Withdraw")} color="#212121" />
            </View>
        </View>
    );
};
export default Balance;

const styles = StyleSheet.create({
    mainBody: {
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    SectionStyle: {
        width: width,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: '#40b46e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    withdrawButton: {
        marginTop: 25
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    otpContainer: {
        marginHorizontal: 'auto',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    otpInputsContainer: {

    },
    otpPinCodeContainer: {
        marginHorizontal: 3
    },
    otpPinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    }
});
