import React, { createRef, useEffect, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../../actions/userAction';
import BottomBar from '../BottomBar';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import IonicIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


export type Props = NativeStackScreenProps<RootStackParamList, "Community">;
const { width, height } = Dimensions.get('window');

const Community = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const { data } = await API.get(`${URL}/auth/getallusers`)
        console.log(data, 'data')
        setUsers([...data?.users])
    };
    console.log(users, 'users')
    return (
        <ScrollView contentContainerStyle={{ justifyContent: "center", overflow: "scroll", alignItems: "center", height: "100%" }}>
            <Text style={styles.heading}>Community</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {users.map((u: any) =>
                    <View style={styles.card}>
                        <IonicIcon name="account-circle" style={styles.icon} size={25} color='#33576e' />
                        <Text>{u?.username}</Text>
                        <Text>{u?.matchIds?.length} matches</Text>
                        <Text>₹{u?.totalAmountWon} Won</Text>
                    </View>
                )}
            </ScrollView>
            <BottomBar route={route} navigation={navigation} />
        </ScrollView>
    );
};
export default Community;

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
    text: {
        color: "#990000"
    },
    bright: {
        color: "#FFFFFF",
        marginLeft: 10
    },
    info: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    cardsContainer: {
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingHorizontal: 10,
        overflow: "scroll",
        height: "auto"
    },
    card: {
        width: "45%",
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 5,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14
    },
    icon: {
        margin: 0
    },
    heading: {
        fontWeight: '600',
        fontSize: 18,
        color: "#ff5959",
        marginVertical: 10
    }
});
