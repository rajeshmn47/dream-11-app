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
    Button,
    useWindowDimensions,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpInput } from "react-native-otp-entry";
import Loader from '../loader/Loader';
import { RootStackParamList } from './../../App';
import { URL } from '../../constants/userConstants';

export type Props = NativeStackScreenProps<RootStackParamList, "Entry">;
const w = Dimensions.get('window').width;
const EntryScreen = ({ navigation }: Props) => {
    const recaptchaVerifier: any = React.useRef(null);
    const appVerifier = recaptchaVerifier.current;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpScreen, setOtpScreen]: any = useState(false);
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
        let dataToSend: any = { phoneNumber: phoneNumber };
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
                    console.log('Please check your email id or password');
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
            let dataToSend: any = { otp: otp, phoneNumber: phoneNumber };
            fetch(`${URL}/auth/verifyPhoneOtp`, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    //Header Defination
                    'Content-Type': "application/json",
                },
            }).then((response) => response.json())
                .then((responseJson) => {
                    //Hide Loader
                    setLoading(false);
                    // If server response message same as Data Matched
                    if (responseJson.success === 'ok') {
                        AsyncStorage.setItem('server_token', responseJson.token);
                        // console.log(responseJson.data.email);
                        navigation.navigate("Home")
                    }
                }).catch((error: any) => {
                    console.error(error)
                    // Error; SMS not sent
                    // ...
                });
            //AsyncStorage.setItem('server_token', responseJson.token);
            //console.log(responseJson.data.email);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainBody}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: `https://s3-alpha-sig.figma.com/img/97df/3c46/1a7414b2e0bc76f1fe04bbf625928d68?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1a-2wu7QaBZRx9rm7r~n3ZtXqFvXajC2wq8tGAClnwW6cgVmCXMe0Oyj8YmbURd4-sIsGqHlZCatnj08ulUxtEJ5tBhUfq7J4xPRXeHsteoAwOa7H1cOnGe1tD7d5cFG~KAvReWC9oLMwnLwkdDbCS9IDEqIgygGCaQLR7Q5otn4XuIlp6t6rX5abOyCq93bB8lPiXfVexKThnr-m-yPAylfQa7KMO33uuFnBHP61M8noLDKCZl9398DIpi-mPG8SyrNoOGbmYdD~tQ5DR6A1Rajc~3d-h4BXF6grQ2Ft9hx5q5agGJM1WjdkHmLhNQlNXlQ~yunEnctJ~VTVmmVQ__` }} style={{ width: '100%', resizeMode: 'contain', height: 900 }} />
                </View>
            </View>
            <View style={styles.bottom}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Register"
                    color="#CC4040"
                    accessibilityLabel="Learn more about this purple button"
                />
                <View style={styles.authContainer}>
                    <TouchableOpacity>
                        <Text
                            style={styles.loginTextStyle}
                            onPress={() => navigation.navigate('Login')}>
                            Already have Account ? Login
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('Register')}>
                        New Here ? Register
                    </Text>
                </View>
            </View>
        </View>
    );
};
export default EntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 1000,
        backgroundColor: '#FFF'
    },
    mainBody: {
        height: 60
    },
    bottom: {
        marginTop: 0,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 5,
        width: w
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: w / 2
    },
    loginTextStyle: {
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: w / 2
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    authContainer: {
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
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