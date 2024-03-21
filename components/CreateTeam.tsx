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
import { checkar, checkwk, getPlayerName, getShrtName } from '../utils/playersFilter';
import { API } from '../actions/userAction';
import Loader from './loader/Loader';


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
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
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
    { key: 'wk', title: 'Wk' },
    { key: 'bat', title: 'Bat' },
    { key: 'ar', title: 'Ar' },
    { key: 'bowl', title: 'Bowl' }
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
          <View style={{ backgroundColor: "transparent", position: "relative" }}>
            <Image source={{ uri: getImgurl(data.image, data.playerName) }} style={{ width: 90, height: 90 }} />
            {match_details?.teamHomePlayers.find((pl: any) => pl.playerId == data.playerId) ?
              <View style={styles.whiteBg}><Text style={styles.black}>{match_details?.teamHomeCode}</Text></View>
              : <View style={styles.blackBg}><Text style={styles.bright}>{match_details?.teamAwayCode}</Text></View>
            }
          </View>
          <View style={styles.team}>
            <Text style={{ textTransform: "capitalize" }}>{getShrtName(data.playerName)}</Text>
          </View>
          <View style={styles.team}>
            <Text>9.0</Text>
          </View>
          <View style={styles.team}>
            {!data.isSelected ?
              <Text>
                <Icon name="pluscircleo" size={30} color="#900" />
              </Text> :
              <Text>
                <Icon name="minuscircleo" size={30} color="#900" />
              </Text>
            }
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.matchInfo}>
        <View style={styles.info}>
          <Text style={styles.bright}>Players</Text>
          <Text style={styles.bright}>{players.filter((k) => k.isSelected === true).length}/11</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.bright}>
            {match_details?.teamHomeCode}
          </Text>
          <Text style={styles.bright} >
            {
              match?.teamHomePlayers.filter((f: any) =>
                players?.filter((k) => k.isSelected === true)?.some((s: any) => f.playerId == s.playerId)
              ).length
            }
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.bright}>
            {match_details?.teamAwayCode}
          </Text>
          <Text style={styles.bright} >
            {
              match?.teamAwayPlayers.filter((f: any) =>
                players?.filter((k) => k.isSelected === true)?.some((s: any) => f.playerId == s.playerId)
              ).length
            }
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.bright}>Credits Left</Text>
          <Text style={styles.bright}>100</Text>
        </View>
      </View>
      <View style={styles.boxes}>
        {players.filter((k) => k.isSelected === true).length <= 11 &&
          players
            .filter((k) => k.isSelected === true)
            .map((p, i: number) => (
              <View style={styles.sBox}>
                <Text style={styles.sText}>{i + 1}</Text>
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
                <Text style={styles.nText}>{i + 1 + players.filter((k) => k.isSelected === true).length}</Text>
              </View>
            ))}
      </View>
      <View style={styles.players}>
        <Loader loading={loading} />
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
                    inactiveColor='black'
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
          onPress={() => handleNext()}
        >
          <View
            style={
              players.filter((k) => k.isSelected === true).length >= 11
                ? styles.next
                : styles.disabled
            }
            pointerEvents={players.filter((k) => k.isSelected === true).length >= 11 ? 'none' : 'auto'}
          >
            <Text style={styles.bright}>next</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    color: 'white',
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
    backgroundColor: '#8abb9d'
  },
  team: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'white',
    color: 'white',
    zIndex: 0,
    height: 600,
    width: "100%"
  },
  bright: {
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  firstTab: {
    backgroundColor: '#47814c'
  },
  secondTab: {
    backgroundColor: '#2d2d2d'
  },
  boxes: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 10
  },
  nBox: {
    width: 25,
    height: 20,
    borderColor: "#47814c",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  sBox: {
    width: 25,
    height: 20,
    borderColor: "#47814c",
    backgroundColor: "#47814c",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  nText: {
    color: "#47814c"
  },
  sText: {
    color: "#FFFFFF"
  },
  matchInfo: {
    height: 80,
    backgroundColor: "#212121",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  info: {
    justifyContent: "center",
    alignItems: "center"
  },
  blackBg: {
    backgroundColor: "#212121",
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5
  },
  whiteBg: {
    backgroundColor: "#BBCF9B",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 7
  },
  black: {
    color: "#212121",
    textTransform: "uppercase"
  }
});