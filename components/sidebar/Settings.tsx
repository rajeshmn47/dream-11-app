import React, { createRef, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../../constants/userConstants';
import { useDispatch, useSelector } from 'react-redux';
import { API, loadUser } from '../../actions/userAction';
import BottomBar from '../BottomBar';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


export type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
const { width, height } = Dimensions.get('window');

const Settings = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [userData, setUserData] = useState<any>({ username: "", email: "", phonenumber: "" })
    const amountInputRef: any = createRef();

    useEffect(() => {
        setUserData(user)
    }, [user])

    const handleUpdate = async () => {
        API.post(`${URL}/auth/updateUser`, { ...userData }).then((responseJson) => {
            dispatch<any>(loadUser())
        }).catch((e) => {
            console.log(e)
        })
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, padding: 15, flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.inputContainer}>
                <Text>Email Address*</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={userData?.email}
                    onChangeText={text => setUserData({ ...userData, email: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Mobile Number*</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={userData?.phonenumber}
                    onChangeText={text => setMobileNumber(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Username*</Text>
                <TextInput
                    label="Username"
                    mode="outlined"
                    value={userData?.username}
                    onChangeText={text => setUserData({ ...userData, username: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Date of Birth*</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={userData?.username}
                    onChangeText={text => setMobileNumber(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Address line 1</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={userData?.username}
                    onChangeText={text => setAmount(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Address line 2</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={userData?.username}
                    onChangeText={text => setAmount(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>State*</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Pin Code*</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />
            </View>
            <View style={{ ...styles.inputContainer, marginTop: 15 }}>
                <Button title="Update" onPress={handleUpdate} color="#33576e" />
            </View>
        </ScrollView>
    );
};
export default Settings;

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
    inputContainer: {
        width: "100%",
        marginTop: 4
    },
    halfInputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4
    },
    halfInput: {
        width: "48%"
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
