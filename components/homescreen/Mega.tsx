import { Text, FlatList, TextInput, View, Image, ViewComponent, StyleSheet } from 'react-native';

export default function Mega() {
    return (
        <View style={styles.mega}>
            <Text style={styles.text}>Mega</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#00cc4e",
        textTransform: "uppercase"
    },
    mega: {
        backgroundColor: "#e4f8e6",
        borderColor: "#31884b",
        borderWidth: 1,
        width: 55,
        padding: 5,
        paddingVertical: 2,
        borderRadius: 5
    }
})