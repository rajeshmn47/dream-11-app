import { Text, TouchableHighlight, View } from "react-native";
import { styles } from "./stylesheet";
import { AntDesign } from '@expo/vector-icons';

export interface MyContest {
    _id: string;
    contest: any;
    teams: any;
}

export function MyContestItem({ data, match, matchLive, navigation }: { data: MyContest, match: any, matchLive: any, navigation: any }) {
    return (
        <TouchableHighlight onPress={() => navigation.navigate("ConDetail", {
            matchId: match.matchId, contestId: data.contest._id,
            contest: data
        })}>
            <View style={styles.myContest}>
                <View style={styles.myConTop}>
                    <View>
                        <Text>
                            Prize Pool
                        </Text>
                        <Text>
                            {data.contest.price}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text>
                            spots
                        </Text>

                        <Text>
                            {data.contest.totalSpots}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Text>
                            Entry
                        </Text>
                        <Text>
                            {Math.floor(data.contest.price / data.contest.totalSpots)}
                        </Text>
                    </View>
                </View>
                <View style={styles.myConMiddle}>
                    <View style={styles.row}>
                        <View style={styles.bigCircle}>
                            <Text>1st</Text>
                        </View>
                        <Text>
                            {data.contest.prizeDetails[0].prize}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.icon}>
                            <AntDesign name="Trophy" size={14} color="black" />
                        </View>
                        <Text>
                            {Math.floor(data.contest.prizeDetails.length / data.contest.totalSpots * 100)}%
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.circle}>
                            <Text style={{ textAlignVertical: "center" }}>M</Text>
                        </View>
                        <View style={styles.circle}>
                            <Text style={{ textAlignVertical: "top" }}>C</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    {data.teams.map((t: any) =>
                        <View style={styles.myConBottom}>
                            <View>
                                <Text style={styles.bottomText}>
                                    {t.username}
                                </Text>
                                {(matchLive?.result == "Complete" && t.won > 0) ? <Text style={styles.winText}>You Won ₹{t.won}!</Text> : null}
                                {((matchLive?.result) == "In Progress" && t.won > 0) ? <Text style={styles.winText}>in Winning zone</Text> : null}
                            </View>
                            <Text style={styles.bottomText}>
                                T{t.teamnumber}
                            </Text>
                            <Text style={styles.bottomText}>
                                {t.points}
                            </Text>
                            <Text style={styles.bottomText}>
                                #{t.rank}
                            </Text>
                        </View>)}
                </View>
            </View>
        </TouchableHighlight>
    )
}