// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    DevSettings,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpInput } from "react-native-otp-entry";
import Loader from '../loader/Loader';
import { RootStackParamList } from '../../App';
import { URL } from '../../constants/userConstants';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
    const recaptchaVerifier: any = React.useRef(null);
    const appVerifier = recaptchaVerifier.current;
    const [phoneNumber, setPhoneNumber] = useState('+91');
    const [otp, setOtp] = useState('');
    const [otpScreen, setOtpScreen]: any = useState(true);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const passwordInputRef: any = createRef();
    const otpRef: any = createRef();
    const attemptInvisibleVerification = false;
    const [verificationId, setVerificationId]: any = React.useState();

    useEffect(() => {
        if (otp.length > 5) {
            verifyOtp(otp)
        }
    }, [otp])

    const handleSubmitPress = () => {
        setErrortext('');
        if (!phoneNumber) {
            alert('Please fill Email');
            return;
        }
        setLoading(true);
        console.log(phoneNumber.slice(3, 13), 'phonenumber');
        let dataToSend: any = { phoneNumber: phoneNumber.slice(3, 13) };
        let formBody: any = [];
        fetch(`${URL}/auth/phoneLogin`, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                //Header Defination
                'Content-Type': "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                // If server response message same as Data Matched
                if (responseJson.success === 'ok') {
                    setOtpScreen(true)
                    //AsyncStorage.setItem('server_token', responseJson.token);
                    //console.log(responseJson.data.email);
                } else {
                    setErrortext(responseJson.msg);
                    console.log('Please check your email id or password', responseJson);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    const verifyOtp = (otpNumber: any) => {
        setErrortext('');
        if (!otp) {
            alert('Please fill Email');
            return;
        }
        else {
            setLoading(true);
            let dataToSend: any = { otp: otp, phoneNumber: 9380899596 };
            fetch(`${URL}/auth/verifyPhoneOtp`, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    //Header Defination
                    'Content-Type': "application/json",
                },
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson, 'json');
                    //Hide Loader
                    setLoading(false);
                    // If server response message same as Data Matched
                    if (responseJson.success === 'ok') {
                        AsyncStorage.setItem('server_token', responseJson.token).then((value) => {
                            DevSettings.reload()
                        })
                    }
                    else {
                        setErrortext(responseJson.message)
                    }
                }).catch((error: any) => {
                    console.error(error)
                    console.log(error.response, 'err')
                    setErrortext(error.response.data.message)
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failure',
                        textBody: error.response.data.message,
                        autoClose: 200
                    })
                    // Error; SMS not sent
                    // ...
                });
            //AsyncStorage.setItem('server_token', responseJson.token);
            //console.log(responseJson.data.email);
        }
    }

    function isNumberValid() {
        if (phoneNumber.length == 13) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <AlertNotificationRoot>
            <View style={styles.mainBody}>
                <Loader loading={loading} />
                <Image source={{ uri: `https://s3-alpha-sig.figma.com/img/97df/3c46/1a7414b2e0bc76f1fe04bbf625928d68?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1a-2wu7QaBZRx9rm7r~n3ZtXqFvXajC2wq8tGAClnwW6cgVmCXMe0Oyj8YmbURd4-sIsGqHlZCatnj08ulUxtEJ5tBhUfq7J4xPRXeHsteoAwOa7H1cOnGe1tD7d5cFG~KAvReWC9oLMwnLwkdDbCS9IDEqIgygGCaQLR7Q5otn4XuIlp6t6rX5abOyCq93bB8lPiXfVexKThnr-m-yPAylfQa7KMO33uuFnBHP61M8noLDKCZl9398DIpi-mPG8SyrNoOGbmYdD~tQ5DR6A1Rajc~3d-h4BXF6grQ2Ft9hx5q5agGJM1WjdkHmLhNQlNXlQ~yunEnctJ~VTVmmVQ__` }} style={{ width: 180, height: 180 }} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode={'on-drag'}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <View>
                        {otpScreen ? <KeyboardAvoidingView enabled>
                            <View style={styles.SectionStyle}>
                                <Text>Verify  your mobile number</Text>
                                <Text>Enter OTP sent to {phoneNumber}</Text>
                                <OtpInput numberOfDigits={6} onTextChange={(text) => setOtp(text)}
                                    theme={{
                                        containerStyle: styles.otpContainer,
                                        inputsContainerStyle: styles.otpInputsContainer,
                                        pinCodeContainerStyle: styles.otpPinCodeContainer,
                                        pinCodeTextStyle: styles.otpPinCodeText,
                                        focusStickStyle: styles.focusStick,
                                        focusedPinCodeContainerStyle: styles.activePinCodeContainer
                                    }} />
                            </View>
                            {errortext != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {errortext}
                                </Text>
                            ) : null}
                            <Text
                                style={{ ...styles.registerTextStyle, marginTop: 20 }}
                                onPress={() => navigation.navigate('Register')}>
                                Didnt recieve OTP? Resend in 17s
                            </Text>
                        </KeyboardAvoidingView> :
                            <KeyboardAvoidingView enabled>
                                <View style={styles.SectionStyle}>
                                    <Text>Log in to craft your ultimate cricket team and dominate the league</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        onChangeText={(phone) =>
                                            setPhoneNumber(phone)
                                        }
                                        placeholder="Enter Phone Number" //12345
                                        placeholderTextColor="#8b9cb5"
                                        value={phoneNumber}
                                        keyboardType="default"
                                        ref={passwordInputRef}
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                        secureTextEntry={false}
                                        underlineColorAndroid="#f000"
                                        returnKeyType="next"
                                    />
                                </View>
                                {errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null}
                                <TouchableOpacity
                                    style={isNumberValid() ? styles.buttonStyle : styles.wrongButtonStyle}
                                    activeOpacity={0.5}
                                    onPress={handleSubmitPress}>
                                    <Text style={styles.buttonTextStyle}>Next</Text>
                                </TouchableOpacity>
                                <Text
                                    style={styles.registerTextStyle}
                                    onPress={() => navigation.navigate('Register')}>
                                    New Here ? Register
                                </Text>
                            </KeyboardAvoidingView>
                        }
                    </View>
                </ScrollView>
            </View>
        </AlertNotificationRoot>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF",
        height: '100%'
    },
    SectionStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 100,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    wrongButtonStyle: {
        backgroundColor: '#D9D9D9',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonStyle: {
        backgroundColor: '#CC4040',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
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
        width: '100%',
        height: 40,
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5,
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
        marginTop: 15
    },
    otpContainer: {
        marginHorizontal: 'auto',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginVertical: 20
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