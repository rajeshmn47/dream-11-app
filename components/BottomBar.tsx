import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";


const w = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function BottomBar({ navigation, route }: { navigation: any, route: any }) {
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const { height, width } = useWindowDimensions();
    const state = useNavigationState(state => state);
    return (
        <View style={{ ...styles.container, width: width }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={route.name == "Home" ? styles.selected : styles.iconContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Image source={require('../assets/home.png')} style={{ width: 24, height: 24 }} />
                    </View>
                    <Text style={route.name == "Home" ? styles.selectedColor : styles.textColor}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyMatches', { userId: user?._id })}>
                <View style={route.name == "MyMatches" ? styles.selected : styles.iconContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Image source={require('../assets/ball.png')} style={{ width: 24, height: 24 }} />
                    </View>
                    <Text style={route.name == "MyMatches" ? styles.selectedColor : styles.textColor}>Matches</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post', { userId: user?._id })}>
                <View style={route.name == "Post" ? styles.selected : styles.iconContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Image source={require('../assets/mycontest.png')} style={{ width: 28, height: 28 }} />
                    </View>
                    <Text style={route.name == "Post" ? styles.selectedColor : styles.textColor}>My Contest</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        color: 'white',
        height: "10%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom: "1%"
    },
    iconContainer: {
        backgroundColor: '#FFF',
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        width: w / 3
    },
    selected: {
        backgroundColor: '#FFF',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: w / 3,
        height: '100%'
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
        margin: 15,
        borderRadius: 10,
        height: 150,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 5
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
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 5,
        borderRadius: 2,
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
        width: 100,
        fontSize: 10,
        flex: 2,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(94, 91, 91)'
    },
    title: {
        overflow: 'hidden',
    },
    textColor: {
        color: '#666666'
    },
    selectedColor: {
        color: '#CC4040'
    }
});