import { useEffect, useState } from "react";
import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from "../utils/dateFormat";
import { View, Text, StyleSheet } from "react-native";

export default function Completed() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.dot}>
                </View>
                <Text style={styles.text}>completed</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    dot: {
        borderRadius: 5,
        backgroundColor: '#3d7940',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 10,
        width: 10,
        marginRight: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#3d7940"
    }
})