import { Dimensions, RefreshControl, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API, loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/Navbar';
import BottomBar from './BottomBar';
import Mega from "./homescreen/Mega";
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { SvgUri } from 'react-native-svg';
import { URL } from '../constants/userConstants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient'
import Loader from './loader/Loader';
import { Timer } from './Timer';
import { RootStackParamList } from '../App';
import PostItem, { Post } from './post/PostItem';
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { hoursRemaining } from '../utils/dateFormat';



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
                    <LinearGradient colors={['rgba(204, 64, 64, 0.14)', 'rgba(255, 255, 255, 0.14)']} style={styles.lineups}>
                        <Text style={styles.redText}>LINEUPS OUT</Text>
                        <Image source={require('../assets/cricket.png')} style={{ marginLeft: 10, width: 20, height: 20 }} />
                    </LinearGradient>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.team}>
                        <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5 }} style={styles.imageContainer}>
                            <Image source={{ uri: `${data.teamHomeFlagUrl.replace('svg', 'png')}` }} style={{ width: 30, height: 40 }} />
                        </LinearGradient>
                        <Text style={{ ...styles.code }} numberOfLines={1}>{data.home.name}</Text>
                    </View>
                    <Timer matchDate={data?.date} />
                    <View style={styles.team}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${data.teamAwayFlagUrl.replace('svg', 'png')}` }} style={{ width: 30, height: 40 }} />
                        </View>
                        <Text style={styles.code} numberOfLines={1}>{data.away.name}</Text>
                    </View>
                </View>
                <View style={styles.timeLine}>
                    <View style={styles.line}>
                    </View>
                    <Text style={styles.time}>
                        {' '}
                        {hoursRemaining(data?.date, 'date', date)&&<AntIcon name='clockcircleo' color='#CC4040' />}
                        {' '}
                        {hoursRemaining(data?.date, 'date', date)}{' '}</Text>
                    <View style={styles.line}>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                        <Mega />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation, route }: Props) {
    const dispatch: any = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_200ExtraLight, Manrope_300Light
    });
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState<any[]>();
    const [featuredPosts, setFeaturedPosts] = useState<any[]>();
    const [completed, setCompleted] = useState<any[]>([])
    const [loading, setLoading] = useState<Boolean>(false);
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'featured', title: 'Featured' },
        { key: 'upcoming', title: 'Upcoming' }]);
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={new Date()} navigation={navigation} />;
    const renderPost: ListRenderItem<Post> = ({ item }) => <PostItem data={item} date={new Date()} navigation={navigation} handleLike={handleLike} submitComment={submitComment} />;
    useEffect(() => {
        if (user?._id) {
            refreshHandler();
        }
    }, [user]);

    const handleLike = async (i: any) => {
        await API.get(`${URL}/like/${i}`);
        const postResponse = await API.get(`${URL}/allPosts`);
        setFeaturedPosts([...postResponse.data.posts])
    }

    const submitComment = async (id: any, comment: any, setComment: any) => {
        API.post(`${URL}/addcomment/${id}`, { comment: comment });
        const postResponse = await API.get(`${URL}/allPosts`);
        setFeaturedPosts([...postResponse.data.posts]);
        setComment('')
    }

    async function refreshHandler() {
        setRefreshing(true);
        try {
            const response = await API.get(`${URL}/homeMatches`);
            const a: [] = response.data.upcoming.results.filter((m: any) => new Date() < new Date(m.date)).sort(
                (c: any, d: any) => new Date(c.date).valueOf() - new Date(d.date).valueOf()
            );
            setUpcoming([...a]);
            setRefreshing(false);
            const postResponse = await API.get(`${URL}/allPosts`);
            setFeaturedPosts([...postResponse.data.posts])
        } catch (error) {
            setRefreshing(false);
        }
    }

    const FirstRoute = () => (
        <View style={{ backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={featuredPosts}
                        renderItem={renderPost}
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
        <View style={{ backgroundColor: '#FFF' }} >
            <FlatList
                data={upcoming}
                renderItem={renderItem}
                keyExtractor={(item: any) => item._id}
            />
        </View>
    );

    const renderScene = SceneMap({
        featured: FirstRoute,
        upcoming: SecondRoute
    });

    return (
        <>
            {fontsLoaded ?
                <View style={styles.container}>
                    <Navbar navigation={navigation} />
                    <Loader loading={loading} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.heading}>Upcoming</Text>
                    </View>
                    <View style={styles.tabsContainer}>
                        <SecondRoute />
                    </View>
                    <BottomBar route={route} navigation={navigation} />
                </View > : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        color: 'white',
        fontStyle: 'italic',
        position: 'relative'
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "84.66%",
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    match: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        height: 160,
        backgroundColor: 'white',
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 3
    },
    postTop: {
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row'
    },
    post: {
        marginHorizontal: 15,
        marginVertical: 15,
        height: 400,
        backgroundColor: 'white',
        overflow: "hidden"
    },
    actions: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row'
    },
    team: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'column',
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
        paddingLeft: 10,
        height: 30,
        backgroundColor: 'rgba(26, 37, 136, 0.06)'
    },
    greenText: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '600',
        color: "#398d44"
    },
    redText: {
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: '400',
        color: "#CC4040",
        textTransform: 'uppercase',
        fontFamily: 'BebasNeue_400Regular'
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
        width: "60%",
        fontSize: 14,
        fontWeight: '600',
        color: '#474C52',
        fontFamily: 'Manrope_600SemiBold'
    },
    headings: {
        width: "50%",
        fontSize: 14,
        fontWeight: '200',
        textTransform: "capitalize",
        textAlign: "right"
    },
    titleContainer: {
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 24,
        paddingHorizontal: 15,
        height: "6%"
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading: {
        overflow: 'hidden',
        fontSize: 20,
        fontWeight: '400',
        backgroundColor: "transparent",
        fontFamily: 'BebasNeue_400Regular',
        textTransform: "uppercase",
        color: "#000000"
    },
    code: {
        overflow: 'hidden',
        fontSize: 12,
        fontWeight: '400',
        color: '#474C52',
        textTransform: 'capitalize',
        fontFamily: 'Manrope_400Regular'
    },
    bottom: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    bottomLeft: {
        width: 130,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    timeLine: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    line: {
        height: 1,
        width: '40%',
        backgroundColor: '#F0F1F3'
    },
    time: {
        color: '#CC4040'
    },
    lineups: {
        width: '40%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});
