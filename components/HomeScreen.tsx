import { StatusBar } from 'expo-status-bar';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import axios from "axios";
import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API, loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/Navbar';
import BottomBar from './BottomBar';
import Mega from "./homescreen/Mega";
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { SvgUri } from 'react-native-svg';
import {
    Title,
    Paragraph,
    Button,
} from 'react-native-paper';
import {
    Tabs,
    TabScreen,
    TabsProvider,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
import { TabItemProps } from '@rneui/themed';
import { URL } from '../constants/userConstants';
import Loader from './loader/Loader';
import { Timer } from './Timer';
import { RootStackParamList } from '../App';


export type Props = NativeStackScreenProps<RootStackParamList, "Home">;


export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
    livestatus: string;
    lineups: string;
}

const Item = ({ data, date, navigation }: { data: Match, date: any, navigation: any }) => {
    const openPopup = () => {
        navigation.navigate('Detail', { matchId: data.id })
    }
    return (
        <TouchableOpacity onPress={() => openPopup()}>
            <View style={styles.match}>
                <View style={styles.topBar}>
                    <Text numberOfLines={1} style={styles.title}>{data?.match_title}</Text>
                    <Text style={styles.greenText}>{data?.lineups}</Text>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.team}>
                        <View style={styles.imageContainer}>
                            <SvgUri
                            onError={() =>
                                console.log('error')
                            }
                            width="40"
                            height="40"
                            style={{ marginRight: 10 }}
                            uri={data.teamHomeFlagUrl.replace("https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_(Pantone).svg")}
                        />
                        </View>
                        <Text style={styles.code}>{data.home.code}</Text>
                    </View>
                    <Timer matchDate={data?.date} />
                    <View style={styles.team}>
                        <Text style={styles.code}>{data.away.code}</Text>
                        <View style={styles.imageContainer}>
                            <SvgUri
                            onError={() =>
                                console.log('error')
                            }
                            width="40"
                            height="40"
                            style={{ marginLeft: 10 }}
                            uri={data.teamAwayFlagUrl.replace("https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_(Pantone).svg")}
                           />
                        
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                        <Mega />
                        <Text style={{ fontWeight: "200" }}>₹59 Crores</Text>
                    </View>
                    <Text style={styles.headings} numberOfLines={1}>{data?.home?.name} vs {data?.away?.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation, route }: Props) {
    const dispatch: any = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState<any[]>();
    const [completed, setCompleted] = useState<any[]>([])
    const [loading, setLoading] = useState<Boolean>(false);
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'featured', title: 'Featured' }]);
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={new Date()} navigation={navigation} />;
    useEffect(() => {
        if (user?._id) {
            refreshHandler();
        }
    }, [user]);

    async function refreshHandler() {
        setRefreshing(true);
        try {
            const response = await API.get(`${URL}/homeMatches`);
            const a: [] = response.data.upcoming.results.filter((m: any) => new Date() < new Date(m.date)).sort(
                (c: any, d: any) => new Date(c.date).valueOf() - new Date(d.date).valueOf()
            );
            setUpcoming([...a]);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
        }
    }

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={upcoming}
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

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={upcoming}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        upcoming: FirstRoute,
        featured: SecondRoute
    });

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <Loader loading={loading} />
            <View style={styles.titleContainer}>
                <Text style={styles.heading}>Upcoming Matches</Text>
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
                                <View style={props.key == (index == 0 ? 'upcoming' : 'featured') ? styles.firstTab : styles.secondTab}>
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
            <BottomBar route={route} navigation={navigation} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        fontStyle: 'italic'
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "86.66%",
        width: "100%"
    },
    selectedTabTextStyle: {
        color: 'green'
    },
    label: {
        color: 'red'
    },
    firstTab: {
        backgroundColor: '#333333'
    },
    secondTab: {
        backgroundColor: '#FFFFFF'
    },
    imageContainer: {
        width: 40,
        height: 40
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
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
        height: 160,
        backgroundColor: 'white',
        overflow: "hidden"
    },
    team: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 0,
        width: 103
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
        padding: 2,
        borderRadius: 2,
        paddingHorizontal: 10
    },
    topBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    greenText: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '600',
        color: "#398d44"
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
        width: 130,
        fontSize: 10,
        alignItems: 'center',
        fontWeight: '200',
        justifyContent: 'center',
        alignContent: 'center'
    },
    date: {
        fontWeight: "200",
        fontSize: 12
    },
    hours: {
        fontWeight: "200"
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(130, 130, 130)'
    },
    title: {
        width: "70%",
        fontSize: 14,
        fontWeight: '200'
    },
    headings: {
        width: "50%",
        fontSize: 14,
        fontWeight: '200',
        textTransform: "capitalize",
        textAlign: "right"
    },
    titleContainer: {
        backgroundColor: "#e7e7e7",
        marginBottom: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        height: "5%"
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '200',
        backgroundColor: "transparent"
    },
    code: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bottom: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fafafa",
        padding: 10
    },
    bottomLeft: {
        width: 130,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    }
});
