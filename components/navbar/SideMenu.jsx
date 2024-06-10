import React from "react";
import { SafeAreaView, Text, View, Switch, TouchableOpacity, DevSettings, Image } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/Feather";
import IonicIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { loadToken, logout } from "../../actions/userAction";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import {
    useFonts,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import * as Font from '@expo-google-fonts/inter';

class SideMenu extends React.Component {
    state = {
        toggle_option_one: false,
        fontsLoaded: false
    };

    callParentScreenFunction = () => this.props.callParentScreenFunction();

    onPress = () => {
        const { dispatch } = this.props;
        dispatch(logout())
        dispatch(loadToken())
        //DevSettings.reload()
    }

    async _loadFontsAsync() {
        await Font.loadAsync(Inter_100Thin,
            Inter_200ExtraLight,
            Inter_300Light,
            Inter_400Regular,
            Inter_500Medium,
            Inter_600SemiBold,
            Inter_700Bold,
            Inter_800ExtraBold,
            Inter_900Black,
            Manrope_200ExtraLight,
            Manrope_300Light,
            Manrope_400Regular,
            Manrope_500Medium,
            Manrope_600SemiBold,
            Manrope_700Bold,
            Manrope_800ExtraBold);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const { navigation, user } = this.props;
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <LinearGradient colors={['rgba(204, 64, 64, 1)', 'rgba(255, 255, 255, 1)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.15 }} style={{ height: '100%', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                            <View style={styles.titleContainer}>
                                <View style={styles.menu}>
                                    <Image source={{ uri: `https://s3-alpha-sig.figma.com/img/2302/e8f2/fe321e621e3950c9509e8ae4d8049677?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D0cS7g1NzuESuUijHkF~DN7fINlhj1plXhHSuEPNpdFQ1VGF-qsJFl32VMeDAD9sfLLWu0QqIb2t82Nlv-e3FtFARUJC33PBvyNQsnpuobBaCOMriKYTPCNw42zIOuSCFqssdcLDepxnJMHeVU2D~-ISpYHBYnk0mh5W-GQEf7rFCG15ShUQ3hnw5rT5TERr9loDmIvtJYY~1RKkkEeGAH9e-1zaO6-1vESHC5NCrYmUWNGyUEKhxiaw-18MruIAWbR7LUnTVLd0jmI0vcvUilanSBx~jlj3IWRkEgBtYa~ZEvamg0St-RBLFKTiXHtLiCD-K2zfrRU~ykVpSZEStQ__` }} style={{ width: 30, height: 40 }} />
                                </View>
                                <Text style={styles.textColor}>{user?.username}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Balance")}>
                            <View style={styles.sidebarItem}>
                                <Icon name="wallet" style={styles.icon} size={20} />
                                <Text style={styles.text}>Wallet Balance</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Community")}>
                            <View style={styles.sidebarItem}>
                                <Icon name="people" style={styles.icon} size={20} />
                                <Text style={styles.text}>Community</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                            <View style={styles.sidebarItem}>
                                <Icon name="settings" style={styles.icon} size={20} />
                                <Text style={styles.text}>settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("HowToPlay")}>
                            <View style={styles.sidebarItem}>
                                <Icon name="game-controller" style={styles.icon} size={20} />
                                <Text style={styles.text}>How to play</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Kyc")}>
                            <View style={styles.sidebarItem}>
                                <AntDesign name="idcard" size={24} color="black" style={styles.icon} />
                                <Text style={styles.text}>KYC</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("TermsandConditions")}>
                            <View style={styles.lastbarItem}>
                                <IonicIcon name="account-group-outline" style={styles.icon} size={20} />
                                <Text style={styles.text}>terms & conditions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Kyc")}>
                            <View style={styles.bottombarItem}>
                                <AntDesign name="idcard" size={24} color="black" style={styles.icon} />
                                <Text style={styles.text}>KYC</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("TermsandConditions")}>
                            <View style={styles.bottombarItem}>
                                <IonicIcon name="account-group-outline" style={styles.icon} size={20} />
                                <Text style={styles.text}>terms & conditions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <Text onPress={this.callParentScreenFunction} style={styles.link}>
                        </Text>

                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default connect()(SideMenu);

const styles = StyleSheet.create({
    menu: {
        width: 48,
        height: 48,
        borderRadius: 40,
        borderColor: 'rgba(50, 45, 45, 1)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        margin: 0,
        flex: 1,
        fontStyle: 'italic',
        fontSize: 18
    },
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 2,
        paddingLeft: 20,
        paddingVertical: 20
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        color: "#444",
        fontSize: 18
    },
    textColor: {
        color: "#000",
        fontSize: 18,
        fontFamily: 'Manrope_400Regular'
    },
    text: {
        fontSize: 14,
        textTransform: "capitalize",
        color: "#AAAAAA",
        fontFamily: 'Inter-100Thin'
    },
    swithBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    switchText: {
        fontSize: 14,
        color: "#222"
    },
    link: {
        padding: 5,
        color: "#892853"
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 12,
        marginBottom: 6
    },
    sidebarItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 15,
        fontSize: 16,
        borderColor: "#AAAAAA",
        borderBottomWidth: 0.2,
        fontFamily: 'Inter-600SemiBold'
    },
    lastbarItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 15,
        fontSize: 16,
        fontFamily: 'Inter-600SemiBold'
    },
    bottombarItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 15,
        fontSize: 16,
        fontFamily: 'Inter-600SemiBold'
    },
    icon: {
        marginRight: 15,
        color: '#AAA'
    },
    arrowicon: {
        marginLeft: 100
    },
    bottomContainer: {

    }
});

const Title = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const SwitchText = ({ text }) => {
    return <Text style={styles.switchText}>{text}</Text>;
};

const Description = ({ text }) => {
    return <Text style={styles.description}>{text}</Text>;
};