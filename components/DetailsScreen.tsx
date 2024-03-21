import { StatusBar } from 'expo-status-bar';
import { Button, RefreshControl, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, TurboModuleRegistry } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import axios from "axios";
import { styles } from './detailscreen/stylesheet';
import { RootStackParamList } from './../App';
import { getmatch } from "../actions/matchAction";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
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
import { checkar, checkwk, getPlayerName } from '../utils/playersFilter';
import { getImgurl } from '../utils/images';
import { HandlerCallbacks } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import SelectTeams from './SelectTeams';
import ConfirmModal from './ConfirmModal';
import Scorecard from './Scorecard';
import Stats from './Stats';
import TeamItem from './detailscreen/TeamItem';
import ContestItem from './detailscreen/ContestItem';
import { MyContestItem } from './detailscreen/MyContestItem';
import CommentaryItem from './detailscreen/CommentaryItem';
import { API, loadUser } from '../actions/userAction';
import Loader from './loader/Loader';
import { useFocusEffect } from '@react-navigation/native';
import ViewTeam from './ViewTeam';



export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    spotsLeft: number;
    price: number;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
    numWinners: number;
}

export interface Team {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: [];
    players: any[];
    captainId: string;
    viceCaptainId: string;
    points: string;
}

export interface MyContest {
    _id: string;
    contest: any;
    teams: any;
}

export interface Commentary {
    ballNbr: string;
    commText: string;
    overNumber: string;
    event: string;
    overSeparator: any;
}


export function getImageName(id: string, match: any) {
    let players: any[] = [...match?.teamAwayPlayers, ...match?.teamHomePlayers]
    let player: any = {};
    player = players.find((p: any) => p.playerId == id)
    let url: string = getImgurl(player?.image, player?.playerName)
    return url;
}

export type Props = NativeStackScreenProps<RootStackParamList, "Detail">;
export default function DetailsScreen({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    const isFocused = useMemo(() => navigation.isFocused(), [])
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [commentary, setCommentary] = useState<any>();
    const [livescore, setLivescore] = useState<any>();
    const [contests, setContests] = useState<any[]>([]);
    const [myContests, setMyContests] = useState<any[]>([])
    const layout = useWindowDimensions();
    const [teams, setTeams] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [showTeam, setShowTeam] = useState<any>(null);
    const [selectTeams, setSelectTeams] = useState<any>({
        selected: false,
        team: null,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [teamOpen, setTeamOpen] = useState<boolean>(false);
    const [modal, setModal] = React.useState<any>(null);
    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = React.useState([
        { key: 'contests', title: 'All Contests' },
        { key: 'myContests', title: `My Contests(${myContests?.length > -1 && myContests?.length})` },
        { key: 'myTeams', title: `My Teams(${teams?.length})` },
        { key: 'commentary', title: 'Commentary' },
        { key: 'scorecard', title: 'scorecard' },
        { key: 'stats', title: 'stats' }
    ]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <ContestItem data={item}
        selectedTeam={selectedTeam} selectTeams={selectTeams} handleClick={handleClick} />;
    const renderTeamItem: ListRenderItem<Team> = ({ item }) => <TeamItem data={item} match={matchlive || match_details} match_details={match_details} navigation={navigation}
        handleTeamShow={handleTeamShow} />;
    const renderMyCoItem: ListRenderItem<MyContest> = ({ item }) => <MyContestItem data={item} match={match_details} matchLive={matchlive} navigation={navigation} />;
    const renderCommentaryItem: ListRenderItem<Commentary> = ({ item }) => <CommentaryItem data={item} match={match_details} />;
    useEffect(() => {
        async function getMatch() {
            setRefreshing(true)
            dispatch<any>(getmatch(route.params.matchId));
            const data = await API.get(`${URL}/getcontests/${route.params.matchId}`);
            setContests(data.data.contests);
            const joinedC = await API.get(`${URL}/getjoinedcontest/${route.params.matchId}`);
            setRefreshing(false);
            if (joinedC.data.contests.length > 0) {
                setMyContests([...joinedC.data.contests]);
            }
        }
        getMatch();
    }, [route.params.matchId]);

    useEffect(() => {
        async function getdata() {
            if (route.params.matchId) {
                const docRef = doc(db, "commentary", route.params.matchId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                } else {
                    // docSnap.data() will be undefined in this case
                }
                const unsub = onSnapshot(
                    doc(db, "commentary", route.params.matchId),
                    (doc: any) => {
                        if (doc.data()) {
                            if (doc.data()?.commentary?.reverse()?.length > 0) {
                                setCommentary([...doc.data().commentary?.reverse()]);
                            }
                            if (doc?.data()?.miniscore) {
                                console.log(doc?.data()?.miniscore, 'checklivescore');
                                setLivescore({ ...doc?.data()?.miniscore });
                            }
                        }
                    }
                );
            }
        }
        getdata();
        // onSnapshot((docRef, "cities"), (snapshot) => {
        // let array = []; // Get users all recent talks and render that in leftColumn content
        // });
    }, [route.params.matchId]);

    useEffect(() => {
        if (selectTeams.team) {
            setOpen(true);
        }
    }, [selectTeams]);

    useEffect(() => {
        setSelectTeams({
            open: false,
            team: selectedTeam,
        });
    }, [selectedTeam]);

    useFocusEffect(
        React.useCallback(() => {
            async function getTeams() {
                const data = await API.get(
                    `${URL}/getteam/?matchId=${route.params.matchId}`
                );
                if (data?.data?.team?.length > 0) {
                    setTeams(data.data.team);
                }
            }
            getTeams();
        }, [route.params.matchId])
    );

    // useEffect(() => {
    //   const i = setInterval(() => {
    //setDate(new Date());
    //   }, 1000);
    //   return () => {
    //       clearInterval(i);
    //   };
    //}, []);
    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={contests}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing ? true : false}
                                onRefresh={refreshHandler}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={myContests}
                        renderItem={renderMyCoItem}
                        keyExtractor={(item: any) => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing ? true : false}
                                onRefresh={refreshHandler}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ maxHeight: "90%" }}>
                <FlatList
                    data={teams}
                    renderItem={renderTeamItem}
                    keyExtractor={(item: any) => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing ? true : false}
                            onRefresh={refreshHandler}
                        />
                    }
                />
            </View>
            {!(matchlive?.result == "In Progress" || matchlive?.result == "Complete") ? <View style={styles.createTeam}>
                <TouchableHighlight onPress={handlePress}>
                    <View style={styles.create}>
                        <AntIcon name="pluscircleo" size={20} color="#ffffff" style={styles.icon} />
                        <Text style={styles.bright}>
                            Create Team
                        </Text>
                    </View>
                </TouchableHighlight>
            </View> : null}
        </View>
    );

    const FifthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={commentary}
                        renderItem={renderCommentaryItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const SixthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <Scorecard data={matchlive} g='g' livescore={livescore} />
                </View>
            </View>
        </View>
    );

    const SeventhRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <Stats matchdata={match_details} team={teams} route={route} />
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        contests: FirstRoute,
        myContests: ThirdRoute,
        myTeams: FourthRoute,
        commentary: FifthRoute,
        scorecard: SixthRoute,
        stats: SeventhRoute
    });

    const loadjoined = async (t: any) => {
        const joinedC: any = await API.get(
            `${URL}/getjoinedcontest/${route.params.matchId}`
        );
        setMyContests([...joinedC.data.contests]);
        setSelectTeams({ selected: false, team: t });
        const data = await API.get(
            `${URL}/getteam/?matchId=${route.params.matchId}`
        );
        setTeams(data.data.team);
        dispatch<any>(loadUser())
    };

    const handleClick = (contest: any) => {
        if (!(matchlive?.result == "In Progress" || matchlive?.result == "Complete")) {
            if (!(teams?.length > 0)) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: 'Please create team to join contest',
                    autoClose: 200
                })
            } else {
                setSelectTeams({ selected: true, team: null })
                setModal(contest)
            }
        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failure',
                textBody: 'Match has already began!',
            })
        }
    }

    const handleTeamShow = (team: any) => {
        setShowTeam(team);
        setTeamOpen(true)
    }

    const handlePress = () => {
        navigation.navigate("Create", {
            matchId: route.params.matchId,
            editMode: false,
            data: undefined
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const refreshHandler = () => {
        setRefreshing(true);
        dispatch<any>(getmatch(route.params?.matchId));
        setRefreshing(false);
    }

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <Loader loading={loading} />
                {!selectTeams.selected ?
                    <>
                        <Overview navigation={navigation} livescore={livescore} matchId={route.params.matchId} match_details={match_details} matchlive={matchlive} />
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            overScrollMode={'auto'}
                            renderTabBar={props => (
                                <TabBar
                                    {...props}
                                    indicatorStyle={{ backgroundColor: 'white' }}
                                    tabStyle={{ width: 145 }}
                                    scrollEnabled={true}
                                    style={{ backgroundColor: '#3d7940' }}
                                />
                            )}
                        />
                        <ConfirmModal
                            open={open}
                            setOpen={setOpen}
                            handleclose={handleClose}
                            modal={modal}
                            teamid={selectedTeam?._id}
                            id={route.params.matchId}
                            loadjoined={loadjoined}
                            setSelectedTeam={setSelectedTeam}
                            Dialog={Dialog}
                        />
                        <ViewTeam
                            teamOpen={teamOpen}
                            setTeamOpen={setTeamOpen}
                            data={showTeam}
                            match={matchlive || match_details}
                            match_details={match_details}
                            navigation={navigation}
                        />
                    </> :
                    <>
                        <SelectTeams teams={teams} setSelectTeams={setSelectTeams} date={date} match_details={match_details} matchlive={matchlive} selectedTeam={selectedTeam}
                            setSelectedTeam={setSelectedTeam} teamIds={myContests.find((c: any) => c?.contest?._id == modal?._id)?.teams?.map((t: any) => t?._id).length > 0 && myContests?.length > 0 ? [...myContests.find((c: any) => c?.contest?._id == modal?._id)?.teams?.map((t: any) => t?._id)] : ['id']} />
                        {/*teamIds={myContests?.length>0?[...myContests.find((c: any) => c?.contest?._id == modal?._id)?.teams?.map((t: any) => t?._id)]:['id']}*/}
                        <TouchableHighlight onPress={handlePress}>
                            <View style={styles.create}>
                                <AntIcon name="pluscircleo" size={20} color="#ffffff" style={styles.icon} />
                                <Text style={styles.bright}>
                                    Create Team
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </>
                }
            </View>
        </AlertNotificationRoot>
    );
}


