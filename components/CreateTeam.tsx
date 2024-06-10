import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Slider } from '@miblanchard/react-native-slider';
import SvgUri from 'react-native-svg-uri';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { getDisplayDate } from '../utils/dateFormat';
import { RootStackParamList } from './../App';
import { getmatch } from "../actions/matchAction";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
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
import { IMG_LEFT, IMG_RIGHT, URL } from '../constants/userConstants';
import { checkar, checkwk, getPlayerName, getShrtName } from '../utils/playersFilter';
import { API } from '../actions/userAction';
import Loader from './loader/Loader';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts
} from '@expo-google-fonts/inter';


export interface Contest {
  _id: string;
  playerName: string;
  image: string;
  isSelected: boolean;
  playerId: string;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Create">;
export default function CreateTeam({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const { match_details, matchlive } = useSelector((state: any) => state.match);
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold, Inter_500Medium, Inter_400Regular
  });
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

  const handlePress = () => {

  }

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Credits</Text>
      </View>
      <View>
        <View>
          <FlatList
            data={players.filter((p) => checkwk(p.position))}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Credits</Text>
      </View>
      <View>
        <View>
          <FlatList
            data={players.filter((p) => p.position == "batsman")}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </View>
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Credits</Text>
      </View>
      <View>
        <View>
          <FlatList
            data={players.filter((p) => checkar(p.position))}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </View>
    </View>
  );

  const FourthRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <Text>Player</Text>
        <Text>Points</Text>
        <Text>Credits</Text>
      </View>
      <View>
        <View>
          <FlatList
            data={players.filter((p) => p.position == "bowler")}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    wk: FirstRoute,
    bat: SecondRoute,
    ar: ThirdRoute,
    bowl: FourthRoute
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'wk', title: 'Wk(3)' },
    { key: 'bat', title: 'Bat(3)' },
    { key: 'ar', title: 'Ar(3)' },
    { key: 'bowl', title: 'Bowl(2)' }
  ]);
  const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;
  useEffect(() => {
    async function getupcoming() {
      setLoading(true);
      if (route.params.matchId) {
        const data = await API.get(`${URL}/getplayers/${route.params.matchId}`);
        setLive(data.data.live);
        let awayPlayers: [] = data.data.matchdetails.teamAwayPlayers.map((obj: any) => ({
          ...obj,
          isHome: false,
          code: data.data.matchdetails?.teamAwayCode,
        }));
        let homePlayers: [] = data.data.matchdetails.teamHomePlayers.map((obj: any) => ({
          ...obj,
          isHome: true,
          code: data.data.matchdetails?.teamHomeCode,
        }));
        if (!data.data.live) {
          if (route.params?.editMode) {
            console.log(route.params?.editMode, 'editnotlivemodeee')
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.map((r) =>
                (route.params.data?.players).find((f: any) => f.playerId == r.playerId)
                  ? { ...r, isSelected: true }
                  : r
              ),
            ]);
          } else {
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([...p]);
          }
        } else {
          if (route.params?.editMode) {
            console.log(route.params?.editMode, 'editlivemode')
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.map((r) =>
                route.params.data.players.find((f: any) => f.playerId == r.playerId)
                  ? { ...r, isSelected: true }
                  : r
              ),
            ]);
          } else {
            console.log(route.params?.editMode, 'livemodeonly')
            const p: any[] = awayPlayers
              .splice(0, 11)
              .concat(homePlayers.splice(0, 11))
              .map((obj: any) => ({
                ...obj,
                isSelected: false,
              }));
            setPlayers([...p]);
          }
        }
        setMatch(data.data.matchdetails);
        const k = homePlayers;
        const l = awayPlayers;
        const nonp: any[] = k
          .splice(k.length - 11, k.length)
          .concat(l.splice(l.length - 11, l.length))
          .map((obj: any) => ({
            ...obj,
            isSelected: false,
          }));
        setNonPlayers([...nonp]);
        const lm: any[] = k
          .splice(k.length - 5, k.length)
          .concat(l.splice(l.length - 8, l.length))
          .map((obj: any) => ({
            ...obj,
            isSelected: false,
          }));
        setLmplayers([...lm]);
      }
      setLoading(false);
    }
    getupcoming();
  }, [route.params.matchId, route.params.editMode]);
  useEffect(() => {
    async function getplayers() {
      if (user?._id && match) {
        const data = await API.get(
          `${URL}/getteam/${match?.titleFI}/${match.titleSI}`
        );
        const moredata = await API.get(
          `${URL}/getteam/${match?.titleSI}/${match?.titleFI}`
        );
        setLmplayers([...data.data.lmplayers]);
      }
    }
    getplayers();
  }, [match, user]);

  const handleClick = (i: string) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i: string) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    if (players.filter((k) => k.isSelected === true).length == 11) {
      navigation.navigate('Captain', { players: players.filter((p) => p.isSelected == true), matchId: route.params.matchId, team: route.params.data, editMode: route.params.editMode })
    }
  };

  const Item = ({ data, date }: { data: Contest, date: any }) => (
    <TouchableHighlight disabled={players.filter((p: any) => p.isSelected == true).length >= 11
      && (!(players.find((p: any) => (p.playerId == data.playerId && p.isSelected == true))))}
      onPress={!data.isSelected ? () => handleClick(data._id) : () => handleRemove(data._id)}>
      <View style={data.isSelected ? styles.pSelected : styles.notSelected}>
        <View style={!data.isSelected ? styles.teamContainer : styles.selected}>
          <View style={{ backgroundColor: "transparent", alignItems: 'center' }}>
            <Image source={{ uri: `${IMG_LEFT}` + `${data?.playerId}` + `${IMG_RIGHT}` }} style={{ width: 60, height: 50 }} />
            {match_details?.teamHomePlayers.find((pl: any) => pl.playerId == data.playerId) ?
              <View style={styles.whiteBg}><Text style={styles.black}>{match_details?.teamHomeCode}</Text>
              </View>
              : <View style={styles.blackBg}><Text style={styles.bright}>{match_details?.teamAwayCode}</Text>
              </View>
            }
          </View>
          <View style={styles.middle}>
            <Text style={{ ...styles.name, textTransform: "capitalize" }} numberOfLines={1}>{getShrtName(data.playerName)}</Text>
            <Text numberOfLines={1} style={styles.selBy}>Sel by 91.21%</Text>
            <View style={styles.redLine}>
              <View style={styles.redDot}></View>
              <Text style={styles.redText}>played last match</Text>
            </View>
          </View>
          <View style={styles.team}>
            <Text style={{ fontFamily: "Inter_600SemiBold", color: "#7c7c7c" }}>600</Text>
          </View>
          <View style={styles.team}>
            <Text style={{ fontFamily: "Inter_600SemiBold" }}>9.0</Text>
          </View>
          <View style={styles.team}>
            <Image source={require('../assets/add.png')} style={{ width: 22, height: 22 }} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#212121"} style='light' />
        <ImageBackground source={require('../assets/cricketbackground.png')} resizeMode="cover" style={styles.image}>
          <View style={{ height: 170, alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.backContainer}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                  <View style={styles.backIcon}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.backText}>Create Team</Text>
                  </View>
                </TouchableHighlight>
                <AntDesign name="questioncircleo" size={24} color="#FFF" />
              </View>
            </View>

            <View style={styles.codes}>
              <View style={styles.codeContainer}>
                <View style={styles.blueBackground}>
                  <Image source={require('../assets/kolkata.png')} style={{ width: 30, height: 30 }} />
                </View>
                <Text style={styles.code}>{match_details?.teamAwayCode}</Text>
              </View>
              <Text style={styles.code}>22 h 30 m left</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.code}>{match_details?.teamHomeCode}</Text>
                <View style={styles.whiteBackground}>
                  <Image source={require('../assets/srh.png')} style={{ width: 30, height: 30 }} />
                </View>
              </View>
            </View>
            <View style={styles.matchInfo}>
              <View style={styles.info}>
                <Text style={{ ...styles.backText, marginRight: 5 }}>Players</Text>
                <Text style={{ marginRight: 5, ...styles.backText }}>{players.filter((k) => k.isSelected === true).length}/11</Text>
              </View>
              <View style={styles.boxes}>
                {players.filter((k) => k.isSelected === true).length <= 11 &&
                  players
                    .filter((k) => k.isSelected === true)
                    .map((p, i: number) => (
                      <View style={styles.sBox}>
                        <RadialGradient
                          colors={['#CC4040', '#662020']}
                          style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                          radius={24}>
                          <Text style={styles.sText}>{i + 1 + players.filter((k) => k.isSelected === true).length}</Text>
                        </RadialGradient>
                      </View>
                    ))}
                {players.filter((k) => k.isSelected === true).length <= 11 &&
                  players
                    .slice(
                      0,
                      11 - players.filter((k) => k.isSelected === true).length
                    )
                    .map((g, i) => (
                      <View style={styles.nBox}>
                      </View>
                    ))}
              </View>
            </View>
          </View>
        </ImageBackground >
        <View style={styles.players}>
          <Loader loading={false} />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'black' }}
                scrollEnabled={true}
                renderTabBarItem={(props) => (
                  <View style={props.key == (!(index == 0) ? 'upcoming' : 'featured') ? styles.firstTab : styles.firstTab}>
                    <TabBarItem
                      {...props}
                      activeColor='white'
                      inactiveColor='white'
                    />
                  </View>
                )}
              />
            )}
          />
        </View>
        <View style={styles.nextContainer}>
          <View style={styles.preview}>
            <Icon name="eyeo" color={'#FFFFFF'} />
            <Text style={styles.black}>
              + Preview | Lineup
            </Text>
            <IonicIcon name="people" color={'#FFFFFF'} />
          </View>
          <TouchableHighlight style={
            players.filter((k) => k.isSelected === true).length >= 11
              ? styles.notDisabled
              : styles.disabledButton
          }
            onPress={() => handleNext()}
          >
            <View
              style={
                players.filter((k) => k.isSelected === true).length >= 11
                  ? styles.nextButton
                  : styles.disabledButton
              }
              pointerEvents={players.filter((k) => k.isSelected === true).length >= 11 ? 'none' : 'auto'}
            >
              <Text style={styles.bright}>next</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFF',
    color: 'white',
  },
  backText: {
    color: 'white',
    fontFamily: "Inter_400Regular"
  },
  backContainer: {
    backgroundColor: 'transparent',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 380,
    paddingHorizontal: 4,
    paddingVertical: 5
  },
  backIcon: {
    backgroundColor: 'transparent',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  contest: {
    elevation: 14,
    margin: 15,
    borderRadius: 10,
    height: 100,
    backgroundColor: 'white',
    padding: 5
  },
  pSelected: {
    height: 90,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: '#F2F2F2'
  },
  middle: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column',
    height: 60,
    padding: 10
  },
  team: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column',
    height: 60,
    padding: 10
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
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    flexDirection: 'row',
    height: 90,
    padding: 0,
    borderRadius: 2,
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  selected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    flexDirection: 'row',
    height: 90,
    borderRadius: 2,
    width: '100%'
  },
  preview: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    borderColor: "#262626",
    borderRadius: 30,
    borderWidth: 1,
    width: '50%'
  },
  nextContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    flexDirection: 'row',
    height: 10,
    padding: 2,
    borderRadius: 2,
    zIndex: 0,
    position: "absolute",
    bottom: 100,
    width: "100%"
  },
  next: {
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: '#FFF',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    borderRadius: 15,
    width: '100%'
  },
  nextButton: {
    width: 100,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: '#FFF',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    borderRadius: 15
  },
  disabledButton: {
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    borderRadius: 30,
    width: 100
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
    padding: 0,
    borderRadius: 10,
    height: 90
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
    width: '50%'
  },
  notDisabled: {
    backgroundColor: "#212121",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    flexDirection: 'row',
    height: 40,
    padding: 2,
    borderRadius: 15,
    width: 100
  },
  blueBackground: {
    width: 35,
    height: 35,
    backgroundColor: '#3A225D',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  whiteBackground: {
    width: 35,
    height: 35,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  players: {
    backgroundColor: 'white',
    color: 'white',
    zIndex: 0,
    height: 600,
    width: "100%"
  },
  bright: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontFamily: "Inter_600SemiBold"
  },
  codes: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginTop: 15
  },
  code: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  firstTab: {
    backgroundColor: '#212121'
  },
  secondTab: {
    backgroundColor: '#ffffff'
  },
  boxes: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 10
  },
  nBox: {
    width: 25,
    height: 25,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  sBox: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderColor: '#FFE500',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 3
  },
  nText: {
    color: "#47814c"
  },
  sText: {
    color: "#FFF",
    textAlign: 'center',
    fontSize: 12,
    fontFamily: "Inter_600SemiBold"
  },
  matchInfo: {
    height: 80,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,

  },
  info: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 2
  },
  blackBg: {
    backgroundColor: "#212121",
    borderRadius: 5,
    paddingHorizontal: 2,
    width: 50,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  whiteBg: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#00000033",
    borderWidth: 1,
    paddingHorizontal: 2,
    width: 50,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  black: {
    color: "#212121",
    textTransform: "uppercase",
    fontFamily: "Inter_600SemiBold"
  },
  header: {
    backgroundColor: '#E4E4E4',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  name: {
    fontFamily: 'Inter_600SemiBold'
  },
  selBy: {
    fontFamily: 'Inter_500Medium',
    color: '#7C7C7C'
  },
  image: {
    width: '100%'
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100
  },
  redLine: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  redDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#DB7979'
  },
  redText: {
    color: '#DB7979',
    marginLeft: 4,
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold'
  }
});