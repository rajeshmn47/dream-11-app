import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import FastImage from 'react-native-fast-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Slider } from '@miblanchard/react-native-slider';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getDisplayDate } from '../../utils/dateFormat';
import { RootStackParamList } from '../HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { showBalls } from '../../utils/balls';


export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: string;
    userIds: [];
}


const Item = ({ data, date }: { data: Contest, date: any }) => (
    <View style={styles.item}>
    </View>
);
export type Props = NativeStackScreenProps<RootStackParamList, "Detail">;
export default function ShowOvers({ over }: { over: any }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [contests, setContests] = useState<[]>([]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;
    useEffect(() => {
        async function getMatch() {
        }
        getMatch();
    }, []);
    useEffect(() => {
        const i = setInterval(() => {
            //setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);
    function check(a: any) {
        if (a == "6" || a == "4" || a == "W") {
            return true;
        }
    }
    return (
        <View style={styles.container}>
            {over &&
                showBalls(over).map((a: any) => check(a) ?
                    <View style={styles.special}><Text style={styles.ball}>{a}</Text></View>
                    : a == "E" ? <View style={styles.null}></View> :
                        <View style={styles.normal}>
                            <Text style={styles.ball}>{a}</Text>
                        </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: '#ffffff',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%"
    },
    top: {
        backgroundColor: '#202020',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        height: 50
    },
    item: {

    },
    ball: {
        color: "#FFF"
    },
    normal: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: "#7e7e7e",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor:"#7e7e7e"
    },
    special: {
        backgroundColor: "#9e0000",
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: "#9e0000",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    null: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: "#FFF",
        borderWidth: 1,
        borderStyle: "dashed",
        backgroundColor:"#7e7e7e"
    }
});