import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { checkar, checkwk, getPlayerName } from "../../utils/playersFilter";
import { getImageName } from "../../utils/images";
import { styles } from "./stylesheet";


export interface Commentary {
    ballNbr: string;
    commText: string;
    overNumber: string;
    event: string;
    overSeparator: any;
}


export default function CommentaryItem({ data, match }: { data: Commentary, match: any }) {
    return (
        <TouchableHighlight>{data.event == 'over-break' ?
            <View style={styles.overBreak}>
                <View>
                    <Text>
                        End of over {data.overSeparator.overNumber}
                    </Text>
                </View>
                <View style={styles.separator}>
                    <Text>{data?.overSeparator.bowlNames[0]}</Text>
                    <Text>{data?.overSeparator.runs} runs</Text>
                    <Text>{data?.overSeparator.bowlwickets} wickets</Text>
                    <Text>{data?.overSeparator.batTeamName}</Text>
                    <Text>
                        {data?.overSeparator.score}/{data?.overSeparator.wickets}
                    </Text>
                </View>
            </View> :
            <View style={styles.commentary}>
                <View style={styles.left}>

                    {data?.event == "WICKET" ? (
                        <View style={styles.wicket}>
                            <Text style={styles.bright}>
                                w</Text>
                        </View>
                    ) : data?.event == "FOUR" ? (
                        <View style={styles.four}>
                            <Text style={styles.bright}>
                                4</Text>
                        </View>
                    ) : data?.event == "SIX" ? (
                        <View style={styles.six}>
                            <Text style={styles.bright}>
                                6
                            </Text>
                        </View>
                    ) : null}
                    <Text>
                        {data.overNumber}
                    </Text>
                </View>
                <View style={styles.commText}>
                    <Text style={styles.cText}>
                        {data.commText}
                    </Text>
                </View>
            </View>
        }
        </TouchableHighlight>
    )
}
