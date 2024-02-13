import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import axios from "axios";
import { getDisplayDate } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/Navbar';
import BottomBar from './BottomBar';
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


export type RootStackParamList = {
    Entry: undefined;
    Home: undefined;
    Detail: { matchId: string };
    Login: undefined,
    Register: undefined,
    Create: { matchId: string, editMode: Boolean },
    Routes: undefined,
    Captain: { players: any[], matchId: string },
    ConDetail: { contestId: string, contest: any, matchId: string },
    MyMatches: { userId: string }
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

const Item = ({ data, date, navigation }: { data: Match, date: any, navigation: any }) => {
    const openPopup = () => {
        console.log(data.id, 'id')
        navigation.navigate('Detail', { matchId: data.id })
    }
    return (
        <TouchableOpacity onPress={() => openPopup()}>
            <View style={styles.match}>
                <View>
                    <Text style={styles.title}>{data.match_title}</Text>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.team}>
                        <SvgUri
                            onError={() =>
                                console.log('error')
                            }
                            width="40"
                            height="40"
                            style={{ marginRight: 10 }}
                            uri={data.teamHomeFlagUrl.replace("https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_(Pantone).svg")}
                        />
                        <Text style={styles.code}>{data.home.code}</Text>
                    </View>
                    <View style={styles.matchDate}>
                        <Text style={styles.dateText}>{getDisplayDate(data.date, 'i', date)}</Text>
                    </View>
                    <View style={styles.team}>
                        <Text style={styles.code}>{data.away.code}</Text>
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
                <View>
                    <Text style={styles.title}>{data.match_title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const { height, width } = Dimensions.get('window')
export default function HomeScreen({ navigation, route }: Props) {
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState<any[]>();
    const [loading, setLoading] = useState<Boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'featured', title: 'Featured' }]);
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={date} navigation={navigation} />;
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/home`);
                const json: any = await response.json();
                const a: [] = json.upcoming.results.sort(
                    (c: any, d: any) => new Date(c.date).valueOf() - new Date(d.date).valueOf()
                );
                setUpcoming([...a]);
            } catch (error) {
            }
            setLoading(false);
        }
        getupcoming();
    }, []);

    const FirstRoute = () => (
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
    console.log(upcoming?.length, 'upcoming')
    return (
        <View style={styles.container}>
            <Navbar />
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
        padding: 10,
        paddingHorizontal: 10
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
        fontWeight: '200'
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(130, 130, 130)'
    },
    title: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: '200'
    },
    code: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
