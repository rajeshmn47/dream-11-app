import { Button, Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal"
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SideMenu from "./SideMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function Navbar({ navigation }: { navigation: any }) {
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const [open, setOpen] = useState<boolean>(false);
    const width = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={styles.menu}>
                        <Image source={{ uri: `https://s3-alpha-sig.figma.com/img/2302/e8f2/fe321e621e3950c9509e8ae4d8049677?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D0cS7g1NzuESuUijHkF~DN7fINlhj1plXhHSuEPNpdFQ1VGF-qsJFl32VMeDAD9sfLLWu0QqIb2t82Nlv-e3FtFARUJC33PBvyNQsnpuobBaCOMriKYTPCNw42zIOuSCFqssdcLDepxnJMHeVU2D~-ISpYHBYnk0mh5W-GQEf7rFCG15ShUQ3hnw5rT5TERr9loDmIvtJYY~1RKkkEeGAH9e-1zaO6-1vESHC5NCrYmUWNGyUEKhxiaw-18MruIAWbR7LUnTVLd0jmI0vcvUilanSBx~jlj3IWRkEgBtYa~ZEvamg0St-RBLFKTiXHtLiCD-K2zfrRU~ykVpSZEStQ__` }} style={{ width: 30, height: 40 }} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textColor}>Powerplay11</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={{ marginRight: 10 }}>
                    <Ionicons name="notifications-outline" color="#666" size={24} />
                </View>
                <View style={styles.inr}>
                    <Text style={styles.redText}>100 INR</Text>
                </View>
            </View>
            <Modal
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
                // Android back press // Swipe to discard
                animationIn="slideInLeft" // Has others, we want slide in from the left
                animationOut="slideOutLeft" // When discarding the drawer
                swipeDirection="left" // Discard the drawer with swipe to left
                useNativeDriver // Faster animation
                hideModalContentWhileAnimating // Better performance, try with/without
                propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal) // Needs to contain the width, 75% of screen width in our case
                style={styles.sideMenuStyle}
            >
             
                    <SideMenu navigation={navigation} user={user} />
                {/*<Button title="close" onPress={() => setOpen(false)} />*/}
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    menu: {
        width: 48,
        height: 48,
        borderRadius: 40,
        borderColor: 'rgba(50, 45, 45, 1)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inr: {
        borderColor: '#666',
        borderWidth: 1,
        padding: 3
    },
    redText: {
        color: '#cc4040'
    },
    container: {
        //marginTop: height / 33,
        backgroundColor: '#FFFFFF',
        color: 'white',
        height: "10%",
        paddingVertical: 0,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: 'rgba(224, 224, 224, 1)',
        borderBottomWidth: 0.3
    },
    leftContainer: {
        color: 'white',
        height: height / 33,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: (width - 20) / 2
    },
    rightContainer: {
        color: 'white',
        height: "100%",
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: (width - 20) / 2
    },
    title: {
        overflow: 'hidden',
    },
    textColor: {
        color: 'white'
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75, // SideMenu width
    }
});