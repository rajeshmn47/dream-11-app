import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../../actions/userAction';
import BottomBar from '../BottomBar';


export type Props = NativeStackScreenProps<RootStackParamList, "TermsandConditions">;
const { width, height } = Dimensions.get('window');

const TermsandConditions = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();

    const handlePayment = async () => {
        fetch(`${URL}/payment/createpayment/${amount}`, {
            method: 'GET',
            headers: {
                //Header Defination
                'Content-Type': "application/json",
            },
        }).then((response) => response.json()).then((responseJson) => {
            const options = {
                description: 'Payment for your service',
                image: 'https://your-company-logo.png',
                currency: 'INR',
                key: RAZORPAY_KEY, // Your Razorpay API Key
                amount: parseInt(amount) * 100, // Amount in paise
                name: 'Your Company Name',
                order_id: responseJson.id,
                prefill: {
                    email: 'customer@example.com',
                    contact: '9876543210',
                    name: 'John Doe',
                },
                theme: { color: '#F37254' },
            };

            RazorpayCheckout.open(options)
                .then((data: any) => {
                    API.post(`${URL}/payment/capture/${data.razorpay_payment_id}/${amount}`)
                })
                .catch((error: any) => {
                    console.log(`Payment error: ${error.code} - ${error.description}`);
                });
        })
    };

    return (
        <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
            <Text style={styles.title}>
                power11 Terms and Conditions
            </Text>
            <Text>
                Welcome to www.mefigure11.com! These Terms and Conditions ("Terms") govern your use of our fantasy platform and related services. By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our platform.
            </Text><Text style={styles.heading}>
                1.Account Registration
            </Text><Text>
                1.1 Eligibility: To use our fantasy platform, you must be at least 18 years old or the legal age of majority in your jurisdiction. By creating an account, you confirm that you meet these eligibility requirements.

                1.2 Account Information: You are responsible for providing accurate and up-to-date information when creating your account. Keep your login credentials secure and do not share them with others.
            </Text>
            <Text style={styles.heading}>
                2.Fantasy Gameplay
            </Text>
            <Text>
                2.1 Fair Play: Engage in fair and sportsmanlike behavior while participating in fantasy sports. Any form of cheating, manipulation, or violation of fair play principles may result in account suspension or termination.

                2.2 Team Management: You have the freedom to manage your fantasy team by selecting players, making transfers, and strategizing. However, you must comply with our platform's rules and guidelines.
            </Text>
            <Text style={styles.heading}>
                3.User Content
            </Text>
            <Text>
                3.1 Ownership: Any content you submit, such as team names, logos, or comments, remains your property. However, by providing content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content on our platform.

                3.2 Prohibited Content: You agree not to submit any content that is unlawful, defamatory, obscene, offensive, or infringes on the rights of others. We reserve the right to remove any content that violates these Terms.
            </Text>
            <Text style={styles.heading}>
                Termination
            </Text>
            <Text>
                We reserve the right to terminate or suspend your account at our discretion, with or without notice, for any reason, including but not limited to violation of these Terms or engaging in activities that compromise the integrity of our platform.
            </Text>
            <Text style={styles.heading}>
                Intellectual Property
            </Text>
            <Text>
                All intellectual property rights related to our fantasy platform, including but not limited to trademarks, copyrights, and logos, are owned by us or our licensors. You may not use, reproduce, or distribute any content from our platform without our express permission.
            </Text>
            <Text style={styles.heading}>
                Privacy
            </Text>
            <Text>
                Your use of our platform is also governed by our Privacy Policy. Please review the Privacy Policy to understand how we collect, use, and protect your personal information.
            </Text>
            <Text style={styles.heading}>
                Changes to Terms
            </Text>
            <Text>
                We may update these Terms from time to time. We will notify you of any significant changes through our platform or other communication channels. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
            </Text>
            <Text style={styles.heading}>
                Contact Us
            </Text>
            <Text>
                If you have any questions or concerns about these Terms, please contact us at mefigure11@gmail.com.
            </Text>
            <Text>
                Thank you for being part of our fantasy community!
            </Text>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
};
export default TermsandConditions;

const styles = StyleSheet.create({
    mainBody: {
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    title: {
        fontWeight: "600",
        textAlign: "center",
        fontSize: 18,
        marginBottom:5
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

    },
    heading: {
        fontWeight: "600",
        textAlign: "left"
    }
});
