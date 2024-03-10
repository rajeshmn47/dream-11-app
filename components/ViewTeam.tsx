import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { checkar, checkwk, getPlayerName } from "../utils/playersFilter";
import { getImageName } from "../utils/images";
import { styles } from "./detailscreen/stylesheet";
import { useSelector } from "react-redux";
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Black from "./Black";
import White from "./White";


export interface Team {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: [];
    players: any[];
    captainId: string;
    viceCaptainId: string;
    points: string
}


export default function ViewTeam({ teamOpen, setTeamOpen, data, match, match_details, navigation }: {
    teamOpen: boolean, setTeamOpen: any, data: any, match: any, match_details: any
    navigation: any
}) {
    const { userToken, user } = useSelector((state: any) => state.user);
    console.log(data, 'data')
    const closeModal = () => {
        setTeamOpen(false)
    }
    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={teamOpen}
        >
            <ImageBackground source={require('../assets/pitch.jpeg')} resizeMode="cover" style={newStyles.image}>
                <View style={styles.teamName}>
                    <Text style={styles.bright}>{user?.username}(T2)</Text>
                    <View style={newStyles.pointsContainer}>
                        {((match?.result == "In Progress" || match?.result == "Complete")) ?
                            <Text style={styles.bright}>Total Points{"  "}-{"  "}<Text style={{ color: "#dbeb50", fontWeight: "600" }}>{data?.points}</Text></Text>
                            : <TouchableHighlight onPress={() => navigation.navigate("Create", { matchId: match_details?.matchId, editMode: true, data: data })}>
                                <Feather name="edit-2" size={18} color="#FFF" />
                            </TouchableHighlight>
                        }
                        <TouchableHighlight onPress={() => closeModal()}>
                            <View style={newStyles.closeIcon}>
                                <Ionicons name='close' size={24} color="#FFF" />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={newStyles.players}>
                    {data?.players?.map((p: any) =>
                        <>
                            {p.playerId == data.captainId ?
                                <View style={newStyles.player}>
                                    <View style={newStyles.teamInfo}>
                                        <View style={newStyles.captainNote}>
                                            <Text style={styles.bright}>c</Text>
                                        </View>
                                        <Image source={{ uri: getImageName(data?.captainId, match) }} style={{ width: 55, height: 55 }} />
                                        {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                            <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, data?.captainId)}</Text></View>
                                            : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, data?.captainId)}</Text></View>
                                        }
                                        <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                    </View>
                                </View>
                                : p.playerId == data.viceCaptainId ?
                                    <View style={newStyles.player}>
                                        <View style={newStyles.teamInfo}>
                                            <View style={newStyles.captainNote}>
                                                <Text style={styles.bright}>vc</Text>
                                            </View>
                                            <Image source={{ uri: getImageName(data.viceCaptainId, match) }} style={{ width: 55, height: 55 }} />
                                            {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                                <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, data?.viceCaptainId)}</Text></View>
                                                : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, data?.viceCaptainId)}</Text></View>
                                            }
                                            <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                        </View></View> :
                                    <View style={newStyles.player}>
                                        <Image source={{ uri: getImageName(p?.playerId, match) }} style={{ width: 55, height: 55 }} />
                                        {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                            <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, p?.playerId)}</Text></View>
                                            : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, p?.playerId)}</Text></View>
                                        }
                                        <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                    </View>}
                        </>)}
                </View>
                <View style={newStyles.teamTop}>
                    <View style={newStyles.teamInfoA}>
                        <White />
                        <Text style={{ ...styles.bright, marginRight: 5 }}>
                            {match_details?.teamHomeCode}
                        </Text>
                        <Text style={styles.bright} >
                            {
                                match?.teamHomePlayers.filter((f: any) =>
                                    data?.players?.some((s: any) => f.playerId == s.playerId)
                                ).length
                            }
                        </Text>
                    </View>
                    <View style={{ ...newStyles.teamInfoA }}>
                        <Black />
                        <Text style={{ ...styles.bright, marginRight: 5 }}>
                            {match_details?.teamAwayCode}
                        </Text>
                        <Text style={styles.bright}>
                            {
                                match?.teamAwayPlayers.filter((f: any) =>
                                    data?.players?.some((s: any) => f.playerId == s.playerId)
                                ).length
                            }
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={newStyles.showTeam}>
                <View style={styles.teamName}>
                    <Text style={styles.bright}>{user?.username}(T2)</Text>
                    <View style={newStyles.pointsContainer}>
                        {((match?.result == "In Progress" || match?.result == "Complete")) ?
                            <Text style={styles.bright}>Total Points{"  "}-{"  "}<Text style={{ color: "#dbeb50", fontWeight: "600" }}>{data?.points}</Text></Text>
                            : <TouchableHighlight onPress={() => navigation.navigate("Create", { matchId: match_details?.matchId, editMode: true, data: data })}>
                                <Feather name="edit-2" size={18} color="#FFF" />
                            </TouchableHighlight>
                        }
                        <TouchableHighlight onPress={() => closeModal()}>
                            <View style={newStyles.closeIcon}>
                                <Ionicons name='close' size={24} color="#FFF" />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={newStyles.teamTop}>
                    <View style={styles.teamInfoA}>
                        <Text style={styles.bright}>
                            {match_details?.teamHomeCode}
                        </Text>
                        <Text style={styles.bright} >
                            {
                                match?.teamHomePlayers.filter((f: any) =>
                                    data?.players?.some((s: any) => f.playerId == s.playerId)
                                ).length
                            }
                        </Text>
                    </View>
                    <View style={styles.teamInfoA}>
                        <Text style={styles.bright}>
                            {match_details?.teamAwayCode}
                        </Text>
                        <Text style={styles.bright}>
                            {
                                match?.teamAwayPlayers.filter((f: any) =>
                                    data?.players?.some((s: any) => f.playerId == s.playerId)
                                ).length
                            }
                        </Text>
                    </View>
                </View>
                <View style={newStyles.players}>
                    {data?.players?.map((p: any) =>
                        <>
                            {p.playerId == data.captainId ?
                                <View style={newStyles.player}>
                                    <View style={newStyles.teamInfo}>
                                        <View style={newStyles.captainNote}>
                                            <Text style={styles.bright}>c</Text>
                                        </View>
                                        <Image source={{ uri: getImageName(data?.captainId, match) }} style={{ width: 55, height: 55 }} />
                                        {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                            <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, data?.captainId)}</Text></View>
                                            : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, data?.captainId)}</Text></View>
                                        }
                                        <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                    </View>
                                </View>
                                : p.playerId == data.viceCaptainId ?
                                    <View style={newStyles.player}>
                                        <View style={newStyles.teamInfo}>
                                            <View style={newStyles.captainNote}>
                                                <Text style={styles.bright}>vc</Text>
                                            </View>
                                            <Image source={{ uri: getImageName(data.viceCaptainId, match) }} style={{ width: 55, height: 55 }} />
                                            {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                                <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, data?.viceCaptainId)}</Text></View>
                                                : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, data?.viceCaptainId)}</Text></View>
                                            }
                                            <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                        </View>
                                    </View> :
                                    <View style={newStyles.player}>
                                        <Image source={{ uri: getImageName(p?.playerId, match) }} style={{ width: 55, height: 55 }} />
                                        {match?.teamHomePlayers.find((pl: any) => pl.playerId == p.playerId) ?
                                            <View style={newStyles.whiteBg}><Text style={newStyles.black}>{getPlayerName(data?.players, p?.playerId)}</Text></View>
                                            : <View style={newStyles.blackBg}><Text style={newStyles.bright}>{getPlayerName(data?.players, p?.playerId)}</Text></View>
                                        }
                                        <Text style={styles.bright}>{p?.point}{" "}Pts</Text>
                                    </View>}</>)}
                </View>
            </View >
        </Modal>
    )
}

const newStyles = StyleSheet.create({
    showTeam: {
        width: "100%",
        height: "100%",
        backgroundColor: "#109e38"
    },
    player: {
        width: "33%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center"
    },
    teamInfoA: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    players: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        height: "90%"
    },
    teamInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        position: "relative",
        height: "65%"
    },
    image: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
    },
    captainNote: {
        position: "absolute",
        borderRadius: 12.5,
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        top: "0%",
        left: "20%",
        backgroundColor: "#000",
        zIndex: 10
    },
    blackBg: {
        backgroundColor: "#212121",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    whiteBg: {
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    bright: {
        color: "#FFF",
        textTransform: "capitalize"
    },
    black: {
        color: "#212121",
        textTransform: "capitalize"
    },
    teamTop: {
        backgroundColor: '#109e38',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 20,
        width: '100%'
    },
    pointsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    closeIcon: {
        marginLeft: 5
    }
})