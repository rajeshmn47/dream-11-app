import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from "../utils/dateFormat";
import React, { createRef, useState } from 'react';
import { View, Button, TextInput, Image, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../actions/userAction';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;

export default function UserProfile() {
    const { userToken, user } = useSelector((state: any) => state.user);
    return (
        <>
            <View style={styles.container}>
                <View style={{ width: "50%" }}>
                    <Image
                        source={require('../assets/profile.png')}
                        style={{
                            width: '100%',
                            height: "100%",
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <View>
                    <View style={styles.info}>
                        <View style={{ width: 30, justifyContent: "center", alignItems: "center" }}>
                            <MaterialIcons name="account-circle" size={24} color="white" />
                        </View>
                        <Text style={styles.bright}>{""}{user?.username}</Text></View>
                    <View style={styles.info}>
                        <View style={{ width: 30, justifyContent: "center", alignItems: "center" }}>
                            <FontAwesome name="mobile-phone" size={24} color="white" />
                        </View>
                        <Text style={styles.bright}>{""}{user?.phonenumber}</Text>
                    </View>
                    <View style={styles.info}>
                        {user?.email ? <>
                            <View style={{ width: 30, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
                                <FontAwesome name="mobile-phone" size={24} color="white" />
                            </View>
                            <Text style={styles.bright}>{" "}{user?.email}</Text>
                        </> : null}
                    </View>
                </View>
            </View>
            <View style={styles.boxContainer}>
                <View style={{ marginVertical: 10 }}>
                    <Button title="Chnge Password" color="#4c9452" />
                </View>
                <Text>Playing History</Text>
                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <MaterialIcons name="leaderboard" size={24} color="#33576e" />
                        <Text>{user?.numberOfContestWon}</Text>
                        <Text>Contest</Text>
                    </View>
                    <View style={styles.card}>
                        <MaterialIcons name="sports-cricket" size={24} color="#33576e" />
                        <Text>{user?.matchIds.length}</Text>
                        <Text>Matches</Text>
                    </View>
                    <View style={styles.card}>
                        <MaterialCommunityIcons name="vector-curve" size={24} color="#33576e" />
                        <Text>{user?.numberOfContestWon}</Text>
                        <Text>Series</Text>
                    </View>
                    <View style={styles.card}>
                        <MaterialIcons name="celebration" size={24} color="#33576e" />
                        <Text>{user?.matchIds.length}</Text>
                        <Text>Wins</Text>
                    </View>
                    <View style={styles.card}>
                        <FontAwesome name="money" size={24} color="#33576e" />
                        <Text>{user?.totalAmountWon}</Text>
                        <Text>Total Winnings</Text>
                    </View>
                    <View style={styles.card}>
                        <MaterialIcons name="create" size={24} color="#33576e" />
                        <Text>{user?.matchIds.length}</Text>
                        <Text>League Created</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#212121",
        padding: 40,
        height: 200
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
    boxContainer: {
        paddingHorizontal: 20
    },
    cardsContainer: {
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 10
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
    }
})