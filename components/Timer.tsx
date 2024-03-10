import { useEffect, useState } from "react";
import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from "../utils/dateFormat";
import { View,Text, StyleSheet } from "react-native";

export function Timer({ matchDate }: { matchDate: any }) {
    const [date, setDate] = useState<Date>(new Date());
    let c: any;
    useEffect(() => {
        //  const i = setInterval(() => {
        // setDate(new Date());
        //}, 1000);
        return () => {
            //  clearInterval(i);89290
        };
    }, []);
    return (
        <>
            {sameDayorNot(new Date(), new Date(matchDate)) ||
                isTommorrow(new Date(), new Date(matchDate)) ? (
                <View style={styles.matchDate}>
                    <Text style={styles.hours}>{hoursRemaining(matchDate, "k", new Date())}</Text>
                    <Text style={styles.date}>
                        {getDisplayDate(matchDate, "i", new Date()) &&
                            getDisplayDate(matchDate, "i", new Date())}
                    </Text>
                </View>
            ) : (
                <View style={styles.matchDate}>
                    <Text style={styles.date}>
                        {getDisplayDate(matchDate, "i", c) && getDisplayDate(matchDate, "i", c)}
                    </Text>
                </View>
            )}
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        fontStyle: 'italic'
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "86.66%",
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
        height: 40
    },
    match: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
        height: 160,
        backgroundColor: 'white',
        overflow: "hidden"
    },
    team: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
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
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    greenText: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '600',
        color: "#398d44"
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
})