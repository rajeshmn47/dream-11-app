import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import axios from "axios";
import { getDisplayDate } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from './HomeScreen';
import { URL } from '../constants/userConstants';
import { SvgUri } from 'react-native-svg';
import BottomBar from './BottomBar';
import Navbar from './navbar/Navbar';
import { Link } from '@react-navigation/native';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';



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
        navigation.navigate('Detail', {
            matchId: data.id
        });
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
const { width, height } = Dimensions.get('window')
export type Props = NativeStackScreenProps<RootStackParamList, "MyMatches">;
export default function MyMatches({ navigation, route }: Props) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'completed', title: 'Completed' }]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [completed, setCompleted] = useState<any[]>([])
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={date} navigation={navigation} />;
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/completed/${user._id}`);
                const json: any = await response.json();
                const a: [] = json.upcoming.results;
                setUpcoming([...a])
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        getupcoming();
    }, []);
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/myMatches/${user._id}`);
                const json: any = await response.json();
                const a: [] = json.completed.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                const b: [] = json.upcoming.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                setCompleted([...a]);
                setUpcoming([...b])
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        getupcoming();
    }, []);
    useEffect(() => {
        const i = setInterval(() => {
            //setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);
    const onPress = () => {
        dispatch(logout())
        dispatch(loadToken())
    }

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
                        data={completed}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );


    const renderScene = SceneMap({
        upcoming: FirstRoute,
        completed: SecondRoute
    });

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.tabsContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(a) => setIndex(a)
                    }
                    initialLayout={{ width: width }}
                    overScrollMode={'auto'}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            tabStyle={{ width: width / 2 }}
                            scrollEnabled={true}
                            renderTabBarItem={(props) => (
                                <View style={props.key == (index == 0 ? 'upcoming' : 'completed') ? styles.firstTab : styles.secondTab}>
                                    <TabBarItem
                                        {...props}
                                        activeColor='white'
                                        inactiveColor='#212121'
                                    />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    matchesContainer: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10,
        height: 600,
        paddingVertical:300
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "86.66%",
        width: "100%"
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
        paddingHorizontal: 10
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
    firstTab: {
        backgroundColor: '#212121'
    },
    secondTab: {
        backgroundColor: '#FFFFFF'
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