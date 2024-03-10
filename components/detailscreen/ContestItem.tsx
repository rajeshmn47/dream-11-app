import { Text, TouchableHighlight, View } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { styles } from "./stylesheet";
import { useSelector } from "react-redux";


export interface Contest {
    _id: string;
    teamsId: [];
    spotsLeft: number;
    totalSpots: number;
    price: number;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
    numWinners: number;
}


export default function ContestItem({ data, selectedTeam, selectTeams, handleClick }: { data: Contest, selectedTeam: any, selectTeams: any, handleClick: any }) {
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    return (
        <TouchableHighlight onPress={() => handleClick(data)}>
            <View style={styles.contest}>
                <View style={styles.contestTop}>
                    <View style={styles.pool}>
                        <Text>Prize Pool</Text>
                        <Text>{data?.price}</Text>
                    </View>
                    <View style={styles.poolEnd}>
                        <Text>Entry</Text>
                        <Text>₹{Math.floor(data.price / data.totalSpots)}</Text>
                    </View>
                </View>
                <View style={styles.slider}>
                    <Slider
                        value={data?.teamsId?.length / data?.totalSpots}
                        maximumTrackTintColor={'rgb(254, 244, 222)'}
                        minimumTrackTintColor={'#b50000'}
                        thumbTouchSize={{ width: 0, height: 0 }}
                        thumbTintColor={'transparent'}
                        thumbStyle={{ width: 0 }}
                    />
                </View>
                <View style={styles.spots}>
                    <Text>
                        {data.spotsLeft} spots left
                    </Text>
                    <Text>
                        {data.totalSpots} spots
                    </Text>
                </View>
                <View style={styles.conBottom}>
                    <View style={styles.row}>

                        <Text>
                            ₹{Math.floor(data.price / data.totalSpots)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.icon}>
                            <AntDesign name="Trophy" size={14} color="black" />
                        </View>
                        <Text>
                            {Math.floor((data.numWinners / data.totalSpots * 100))}%
                            Single
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}
