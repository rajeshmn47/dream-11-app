import { StatusBar } from 'expo-status-bar';
import { Button, RefreshControl, ScrollView, StyleSheet, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './../App';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { getmatch } from '../actions/matchAction';

export interface Contest {
    _id: string;
    playerName: string;
    image: string;
    isSelected: Boolean;
    isCaptain: Boolean;
    isViceCaptain: Boolean;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Captain">;
export default function Scorecard({ data, livescore, g }: { data: any, g: any, livescore: any }) {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const width = useWindowDimensions().width
    const [tableHead, setTableHead] = useState<any[]>(['batter', 'r', 'b', '4s', '6s', 's/r']);
    const [widthArr, setWidthArr] = useState<any[]>([width * 2 / 7, width / 7, width / 7, width / 7, width / 7, width / 7]);
    const [homePlayers, setHomePlayers] = useState<any[]>([]);
    const [awayPlayers, setAwayPlayers] = useState<any[]>([]);
    useEffect(() => {
        if (data?.teamHomePlayers.length > 0) {
            setHomePlayers(data?.teamHomePlayers)
        }
        if (data?.teamAwayPlayers.length > 0) {
            setAwayPlayers(data?.teamAwayPlayers)
        }
    }, [data]);
    const refreshHandler = () => {
        setRefreshing(true);
        dispatch<any>(getmatch(data?.matchId));
        setRefreshing(false);
    }
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing ? true : false}
                onRefresh={refreshHandler}
            />
        }>
            {data?.teamHomePlayers?.length ? <View style={styles.container}>
                <Collapse style={styles.collapse}>
                    <CollapseHeader>
                        {data?.isHomeFirst ? <View style={styles.headerContainer}>
                            <Text style={styles.title}>{data?.titleFI}</Text>
                            <View style={styles.downScore}>
                                <Text>({data?.oversFI}overs) {data?.runFI}/{data?.wicketsFI}</Text>
                                <Icon name="down" />
                            </View>
                        </View>
                            :
                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>{data?.titleSI}</Text>
                                <View style={styles.downScore}>
                                    <Text>
                                        ({data?.oversSI}overs) {data?.runSI}/{data?.wicketsSI}
                                    </Text>
                                    <Icon name="down" />
                                </View>
                            </View>}
                    </CollapseHeader>
                    <CollapseBody>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={tableHead} flexArr={[1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.headerText} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    homePlayers.map((r, index) => (
                                        <Row
                                            key={index}
                                            data={[r.playerName, r.runs, r.balls, r.fours, r.sixes, Math.floor(r.strikeRate)]}
                                            widthArr={widthArr}
                                            style={styles.row}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={['bowler', 'o', 'm', 'r', 'w', 'e']} flexArr={[1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.headerText} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    awayPlayers.filter((a) => a.overs > 0).map((r, index) => (
                                        <Row
                                            key={index}
                                            data={[r.playerName, r.overs, r.maidens, r.runsConceded, r.wickets, Math.floor(r.economy * 10)]}
                                            widthArr={widthArr}
                                            style={styles.row}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader>
                        {!data?.isHomeFirst ? <View style={styles.headerContainer}>
                            <Text style={styles.title}>{data?.titleFI}</Text>
                            <View style={styles.downScore}>
                                <Text>({data?.oversFI}overs) {data?.runFI}/{data?.wicketsFI}</Text>
                                <Icon name="down" />
                            </View>
                        </View>
                            :
                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>{data?.titleSI}</Text>
                                <View style={styles.downScore}>
                                    <Text>
                                        ({data?.oversSI}overs) {data?.runSI} / {data?.wicketsSI}
                                    </Text>
                                    <Icon name="down" />
                                </View>
                            </View>}
                    </CollapseHeader>
                    <CollapseBody>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={tableHead} flexArr={[1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.headerText} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    awayPlayers.map((r, index) => (
                                        <Row
                                            key={index}
                                            data={[r.playerName, r.runs, r.balls, r.fours, r.sixes, Math.floor(r.strikeRate)]}
                                            widthArr={widthArr}
                                            style={styles.row}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={['bowler', 'o', 'm', 'r', 'w', 'e']} flexArr={[1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.headerText} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    homePlayers.filter((a) => a.overs > 0).map((r, index) => (
                                        <Row
                                            key={index}
                                            data={[r.playerName, r.overs, r.maidens, r.runsConceded, r.wickets, Math.floor(r.economy * 10)]}
                                            widthArr={widthArr}
                                            style={styles.row}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </CollapseBody>
                </Collapse>
            </View> : <Text style={{ textTransform: "capitalize", marginTop: 10, textAlign: "center", color: "#8d0606" }}>
                match not begun yet
            </Text>}
        </ScrollView>
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
        zIndex: 0
    },
    next: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
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
        zIndex: 10
    },
    bright: {
        color: '#FFFFFF'
    },
    dark: {
        color: '#000000'
    },
    captain: {
        borderRadius: 10,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    vCaptain: {
        borderRadius: 10,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no: {
        borderRadius: 10,
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    head: { height: 40, backgroundColor: '#202020' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '200' },
    headerText: { textAlign: 'center', fontWeight: '400', color: "#FFF", textTransform: "capitalize" },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#ffffff' },
    headerContainer: {
        backgroundColor: 'rgb(254, 244, 222)',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row'
    },
    downScore: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 150
    },
    title: {
        textTransform: 'uppercase'
    },
    collapse: {
        borderBottomColor: '#d89595',
        borderBottomWidth: 1,
        height: "auto"
    }
});