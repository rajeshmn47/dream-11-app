import { useEffect, useState } from "react";
import { getDisplayDate, hoursRemaining, isTommorrow, sameDayorNot } from "../utils/dateFormat";
import { View, Text, StyleSheet } from "react-native";

export default function Live() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.dot}>
                </View>
                <Text style={styles.text}>live</Text>
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
        backgroundColor: '#990000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 10,
        width: 10,
        marginRight: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#990000"
    }
})