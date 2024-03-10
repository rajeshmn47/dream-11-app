import { StatusBar } from 'expo-status-bar';
import { Button, Modal, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import { getDisplayDate } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API, loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../constants/userConstants';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


export type RootStackParamList = {
    Home: undefined;
    Detail: { matchId: string };
    Login: undefined,
    Register: undefined,
    Create: { matchId: string, editMode: Boolean },
    Routes: undefined,
    Captain: { players: any[], matchId: string }
};

export type Props = NativeStackScreenProps<RootStackParamList, "Home">;


export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
}


export default function ConfirmModal({ open, setOpen, handleclose,
    modal,
    teamid,
    id,
    loadjoined,
    setSelectedTeam,
    Dialog }: {
        open: boolean, setOpen: any,
        handleclose: any,
        modal: any,
        teamid: string,
        id: string
        loadjoined: any,
        setSelectedTeam: any,
        Dialog: any
    }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            setLoading(false);
        }
        getupcoming();
    }, []);
    useEffect(() => {
        const i = setInterval(() => {
            // setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);
    const onPress = async () => {
        try {
            const data = await API.get(
                `${URL}/joincontest/${modal._id}?teamid=${teamid}`
            );
            loadjoined();
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Joined Contest Successfully',
                textBody: 'Congrats! joined contest successfully',
                autoClose: 100
            });
            setSelectedTeam(null);
            setOpen(false);
        } catch (error: any) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Cannot join contest',
                textBody: 'Join contest failed',
                autoClose: 500
            })
            setSelectedTeam(null);
            setOpen(false);
        }
    }
    const close = () => {
        setSelectedTeam(null);
        setOpen(false);
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
            >
                <View style={styles.modal}>
                    <View style={styles.modalTop}>
                        <Text>Confirmation</Text>
                        <View><Ionicons name='close' size={24} onPress={() => close()} /></View>
                    </View>
                    <View style={styles.modalTop}>
                        <Text>Entry</Text>
                        <Text>200</Text>
                    </View>
                    <View style={styles.modalTop}>
                        <Text>Apply 25 coupon</Text>
                        <Text>25%</Text>
                    </View>
                    <View style={styles.modalTop}>
                        <Text>Usable cash bonus</Text>
                        <Text>0</Text>
                    </View>
                    <View style={styles.modalTop}>
                        <Text>To Pay</Text>
                        <Text>{modal && (modal.price / modal.totalSpots)}</Text>
                    </View>
                    <Text style={styles.note}>
                        By joining this contest, you accept Dream11 T&C's and confirm that you are not resident of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim or Telangana. I also agree to be contacted by Dream11 and their partners.
                    </Text>
                    <Button
                        onPress={onPress}
                        title="Join Contest"
                        color="#4c9452"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: 'white',
        padding: 10,
        width: "100%",
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    match: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 15,
        borderRadius: 10,
        height: 150,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 5
    },
    team: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: 40
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        height: 50,
        padding: 10
    },
    stretch: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 5,
        borderRadius: 2,
    },
    modalTop: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: 5
    },
    note: {
        marginVertical: 15,
        textAlign: "center"
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2,
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    matchDate: {
        width: 100,
        fontSize: 10,
        flex: 2,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(94, 91, 91)'
    },
    title: {
        overflow: 'hidden',
    },
    modal: {
        width: "80%",
        marginTop: 50,
        height: 300,
        marginHorizontal: "10%",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        zIndex: 1000,
        padding: 5
    }
});
