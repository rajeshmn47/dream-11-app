import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API, loadUser } from '../actions/userAction';
import { ALERT_TYPE, AlertNotificationDialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import UserBankAccount from './UserBankAccount';
import UpiId from './UpiId';
import { Dialog, Portal, Text } from 'react-native-paper';


export type Props = NativeStackScreenProps<RootStackParamList, "Withdraw">;
const { width, height } = Dimensions.get('window');

const Withdraw = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'upi', title: 'UPI' },
        { key: 'bankAccount', title: 'Bank Account' }]);
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    const handleWithdraw = () => {
        if (user?.upiId) {
            const data = {
                amount: amount
            };
            if (user.wallet > amount) {
                const url = `${URL}/payment/withdraw`
                API.post(url, { ...data })
                    .then((response) => {
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: 'Success',
                            textBody: "withdrawal request successful",
                            autoClose: 1000
                        })
                        setAmount('0')
                        dispatch<any>(loadUser())
                        setTimeout(() => navigation.navigate("Balance"), 1000)
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Failure',
                            textBody: error.response.data.message,
                            autoClose: 1000
                        })
                    });
            }
            else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: "your requested is more than that in your walet",
                    autoClose: 1000
                })
            }
        }
        else {
            setVisible(true)
        }
    };

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <UpiId />
                </View>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <UserBankAccount />
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        upi: FirstRoute,
        bankAccount: SecondRoute
    });

    return (
        <AlertNotificationRoot>
            <ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(phone) =>
                            setAmount(phone)
                        }
                        placeholder="Enter Amount" //12345
                        placeholderTextColor="#8b9cb5"
                        keyboardType="default"
                        ref={amountInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        secureTextEntry={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                    />
                </View>
                <View style={{ width: width, paddingHorizontal: 35, marginTop: 20 }}>
                    <Button title="Withdraw" onPress={handleWithdraw} color="#4c9452" />
                </View>
            </View>
            <View style={styles.tabsContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(a) => setIndex(a)
                    }
                    initialLayout={{ width: layout.width }}
                    overScrollMode={'auto'}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: 'black' }}
                            tabStyle={{ width: width / 2 }}
                            scrollEnabled={true}
                            renderTabBarItem={(props) => (
                                <View style={props.key == (index == 0 ? 'upi' : 'bankAccount') ? styles.firstTab : styles.secondTab}>
                                    <TabBarItem
                                        {...props}
                                        activeColor='white'
                                        inactiveColor='black'
                                    />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Their is a Error</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Please update your upiID or bank account to withdraw</Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            </ScrollView>
        </AlertNotificationRoot>
    );
};

export default Withdraw;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: 300,
        width: "100%",
        marginTop: 20
    },
    firstTab: {
        backgroundColor: '#333333'
    },
    secondTab: {
        backgroundColor: '#FFFFFF'
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

    }
});
