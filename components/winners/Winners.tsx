import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataTable } from 'react-native-paper';
import { URL } from '../../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../../actions/userAction';
import BottomBar from '../BottomBar';


export type Props = NativeStackScreenProps<RootStackParamList, "Winners">;
const { width, height } = Dimensions.get('window');

const Winners = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();
    const [items] = React.useState<any[]>([
        {
            key: 1,
            name: 'Cupcake',
            calories: 356,
            fat: 16,
        },
        {
            key: 2,
            name: 'Eclair',
            calories: 262,
            fat: 16,
        },
        {
            key: 3,
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
        },
        {
            key: 4,
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.winnersList}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Rank</DataTable.Title>
                        <DataTable.Title numeric>Username</DataTable.Title>
                        <DataTable.Title numeric>Points</DataTable.Title>
                    </DataTable.Header>
                    {items.map((item: any, rank: number) => (
                        <DataTable.Row key={item.key}>
                            <DataTable.Cell>#{rank + 1}</DataTable.Cell>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </View>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
};
export default Winners;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        fontStyle: 'italic'
    },
    winnersList: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "101%",
        width: "100%"
    },
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

    }
});
