import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { checkar, checkwk, getPlayerName } from "../../utils/playersFilter";
import { getImageName } from "../../utils/images";
import { styles } from "./stylesheet";
import { useSelector } from "react-redux";
import { Feather } from '@expo/vector-icons';


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


export default function TeamItem({ data, match, match_details, navigation, handleTeamShow }: { data: Team, match: any, match_details: any, navigation: any,handleTeamShow:any }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    return (
    <TouchableHighlight onPress={()=>handleTeamShow(data)}>
        <View style={styles.wholeTeamContainer}>
            <View style={styles.teamName}>
                <Text style={styles.bright}>{user?.username}(T2)</Text>
                {(!(match?.result == "In Progress" || match?.result == "Complete")) ?
                    <TouchableHighlight onPress={() => navigation.navigate("Create", { matchId: match_details?.matchId, editMode: true, data: data })}>
                        <Feather name="edit-2" size={18} color="#FFF" />
                    </TouchableHighlight> :
                    <Text style={styles.bright}>Total Points{"  "}-{"  "}<Text style={{ color: "#dbeb50", fontWeight: "600" }}>{data.points}</Text></Text>
                }
            </View>
            <View style={styles.teamTop}>
                <View style={styles.teamInfoA}>
                    <Text style={styles.bright}>
                        {match_details?.teamHomeCode}
                    </Text>
                    <Text style={styles.bright} >
                        {
                            match?.teamHomePlayers.filter((f: any) =>
                                data?.players.some((s: any) => f.playerId == s.playerId)
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
                                data?.players.some((s: any) => f.playerId == s.playerId)
                            ).length
                        }
                    </Text>
                </View>
                <View style={styles.teamInfo}>
                    <View style={styles.captainNote}>
                        <Text style={styles.bright}>c</Text>
                    </View>
                    <Image source={{ uri: getImageName(data?.captainId, match) }} style={{ width: 55, height: 55 }} />
                    <Text style={styles.player}>{getPlayerName(data?.players, data?.captainId)}</Text>
                </View>
                <View style={styles.teamInfo}>
                    <View style={styles.captainNote}>
                        <Text style={styles.bright}>vc</Text>
                    </View>
                    <Image source={{ uri: getImageName(data.viceCaptainId, match) }} style={{ width: 55, height: 55 }} />
                    <Text style={styles.player}>{getPlayerName(data?.players, data?.viceCaptainId)}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.singleInfo}>
                    <Text style={styles.light}>WK</Text>
                    <Text>({data.players.filter((p) => checkwk(p.position)).length})</Text>
                </View>
                <View style={styles.singleInfo}>
                    <Text style={styles.light}>BAT</Text>
                    <Text>({data.players.filter((p) => p.position == "batsman").length})</Text>
                </View>
                <View style={styles.singleInfo}>
                    <Text style={styles.light}>AR</Text>
                    <Text>({data.players.filter((p) => checkar(p.position)).length})</Text>
                </View>
                <View style={styles.singleInfo}>
                    <Text style={styles.light}>BOWL</Text>
                    <Text>({data.players.filter((p) => p.position == "bowler").length})</Text>
                </View>
            </View>
        </View >
        </TouchableHighlight>
    )
}
