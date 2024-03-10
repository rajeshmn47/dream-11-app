import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Slider } from '@miblanchard/react-native-slider';
import SvgUri from 'react-native-svg-uri';
import { getDisplayDate } from '../utils/dateFormat';
import { RootStackParamList } from './../App';
import { getmatch } from "../actions/matchAction";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
import { getImgurl } from '../utils/images';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import db from "../firebase/config";
import Overview from './topbar/Overview';
import { URL } from '../constants/userConstants';
import { checkar, checkwk } from '../utils/playersFilter';
import { API } from '../actions/userAction';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


export interface Contest {
    _id: string;
    playerName: string;
    image: string;
    isSelected: Boolean;
    isCaptain: Boolean;
    isViceCaptain: Boolean;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Captain">;
export default function SelectCaptain({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [date, setDate] = useState<Date>(new Date());
    const [commentary, setCommentary] = useState<any>();
    const [livescore, setLivescore] = useState<any>();
    const [contests, setContests] = useState([]);
    const layout: any = useWindowDimensions();
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const [match, setMatch] = useState<any>(null);
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [next, setNext] = useState<Boolean>(false);
    const [nonPlayers, setNonPlayers] = useState<any[]>([]);
    const [lmPlayers, setLmplayers] = useState<any[]>([]);
    const [live, setLive] = useState<any>();


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'wk', title: 'Wk' },
        { key: 'bat', title: 'Bat' },
        { key: 'ar', title: 'Ar' },
        { key: 'bowl', title: 'Bowl' }
    ]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;

    useEffect(() => {
        async function getPlayers() {
            setPlayers([...route.params.players])
            const pl = route.params.players.map((obj) => ({
                ...obj,
                isCaptain: obj.playerId == route.params.team?.captainId ? true : false,
                isViceCaptain: obj.playerId == route.params.team?.viceCaptainId ? true : false,
            }))
            setPlayers([...pl])
        }
        getPlayers();
    }, [route.params.matchId]);
    const handleCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isCaptain = true;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const nHandleCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isCaptain = false;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const handleVCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isViceCaptain = true;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const nHandleVCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isViceCaptain = false;
            }
            return p;
        });
        setPlayers([...po]);
    };

    function isCandVcselected() {
        const a = players.find((s) => s.isCaptain === true);
        const b = players.find((s) => s.isViceCaptain === true);
        return a && b;
    }

    const handleSave = () => {
        const dataToSend: any = {
            players: players,
            matchId: route.params.matchId,
            captainId: players.find((p) => p.isCaptain == true).playerId,
            vicecaptainId: players.find((p) => p.isViceCaptain == true).playerId,
        }
        let url = route.params.editMode ? `${URL}/updateTeam/${route.params.team?._id}` : `${URL}/saveteam/${route.params.matchId}`;
        if (route.params.editMode) {
            API.put(url, dataToSend).then((responseJson) => {
                //Hide Loader
                setLoading(false);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Congrats! your team is created successfully',
                    autoClose: 500
                })
                navigation.navigate('Detail', { matchId: route.params.matchId });
                // If server response message same as Data Matched
            }).catch((error: any) => {
                console.error(error)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: error.response.data.message,
                    autoClose: 500
                })
                navigation.navigate('Detail', { matchId: route.params.matchId });
                // Error; SMS not sent
                // ...
            });
        }
        else {
            API.post(url, dataToSend).then((responseJson) => {
                //Hide Loader
                setLoading(false);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Congrats! your team is created successfully',
                    autoClose: 500
                })
                navigation.navigate('Detail', { matchId: route.params.matchId });
                // If server response message same as Data Matched
            }).catch((error: any) => {
                console.error(error)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: error.response.data.message,
                    autoClose: 500
                })
                navigation.navigate('Detail', { matchId: route.params.matchId });
                // Error; SMS not sent
                // ...
            });
        }
    };
    const Item = ({ data, date }: { data: Contest, date: any }) => (
        <View>
            <View style={styles.playerContainer}>
                <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Image source={{ uri: getImgurl(data.image, data.playerName) }} style={{ height: 50, width: 50, borderRadius: 5 }} />
                </View>
                <View style={styles.team}>
                    <Text>{data.playerName}</Text>
                </View>
                <TouchableHighlight onPress={() => data.isCaptain ? nHandleCaptain(data._id) : handleCaptain(data._id)}>
                    <View style={data.isCaptain ? styles.captain : styles.no}>
                        <Text style={data.isCaptain ? styles.bright : styles.dark}>c</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => data.isViceCaptain ? nHandleVCaptain(data._id) : handleVCaptain(data._id)}>
                    <View style={data.isViceCaptain ? styles.vCaptain : styles.no}>
                        <Text style={data.isViceCaptain ? styles.bright : styles.dark}>vc</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.players}>
            </View>
            <View>
                <FlatList
                    data={players}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item._id}
                />
            </View>
            <View style={styles.nextContainer}>
                <View style={styles.preview}>
                    <Icon name="eyeo" color={'#FFFFFF'} />
                    <Text style={styles.bright}>
                        Preview / Lineup
                    </Text>
                    <IonicIcon name="people" color={'#FFFFFF'} />
                </View>
                <TouchableHighlight style={
                    players.filter((k) => k.isSelected === true).length >= 11
                        ? styles.notDisabled
                        : styles.disabled
                }
                    onPress={() => handleSave()}
                >
                    <View
                        style={
                            isCandVcselected()
                                ? styles.next
                                : styles.disabled
                        }
                        pointerEvents={isCandVcselected() ? 'none' : 'auto'}
                    >
                        <Text style={styles.bright}>save</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    contest: {
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
        height: 100,
        backgroundColor: 'white',
        padding: 5
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
    playerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderBottomWidth: 1,
        borderColor: "#CCC"
    },
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    nextContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 10,
        padding: 2,
        borderRadius: 2,
        zIndex: 0,
        position: "absolute",
        bottom: "10%",
        width: "100%"
    },
    next: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: '#FFF',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '100%'
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    date: {
        fontSize: 10
    },
    notSelected: {
        backgroundColor: '#9e7044',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    selected: {
        backgroundColor: '#ecac6f',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    disabled: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '100%'
    },
    notDisabled: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    players: {
        zIndex: 10
    },
    bright: {
        color: '#FFFFFF',
        textAlign: "center"
    },
    dark: {
        color: '#000000',
        textAlign: "center"
    },
    captain: {
        borderRadius: 12.5,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    vCaptain: {
        borderRadius: 12.5,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no: {
        borderRadius: 12.5,
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    }
});