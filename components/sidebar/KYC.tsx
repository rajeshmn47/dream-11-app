import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../../actions/userAction';
import BottomBar from '../BottomBar';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


export type Props = NativeStackScreenProps<RootStackParamList, "Kyc">;
const { width, height } = Dimensions.get('window');

const KYC = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'mobile', title: 'Mobile & Em...' },
        { key: 'pan', title: 'PAN' },
        { key: 'bank', title: 'Bank' }]);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();


    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View style={styles.screens}>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome name="mobile-phone" size={30} color="#212121" />
                    </View>
                    <View>
                        <Text>Your mobile number is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <Fontisto name="email" size={24} color="#212121" />
                    </View>
                    <View>
                        <Text>Your email is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View style={styles.screens}>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome name="mobile-phone" size={30} color="#212121" />
                    </View>
                    <View>
                        <Text>Your mobile number is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <Fontisto name="email" size={24} color="#212121" />
                    </View>
                    <View>
                        <Text>Your email is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View style={styles.screens}>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome name="mobile-phone" size={30} color="#212121" />
                    </View>
                    <View>
                        <Text>Your mobile number is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
                <View style={styles.verified}>
                    <View style={{ width: 35, justifyContent: "center", alignItems: "center" }}>
                        <Fontisto name="email" size={24} color="#212121" />
                    </View>
                    <View>
                        <Text>Your email is verified</Text>
                        <Text style={styles.data}>{user?.phonenumber}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        mobile: FirstRoute,
        pan: SecondRoute,
        bank: ThirdRoute
    });

    return (
        <View style={styles.tabsContainer}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(a) => setIndex(a)
                }
                initialLayout={{ width: width }}
                overScrollMode={'auto'}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#40b46e' }}
                        tabStyle={{ width: width / 3 }}
                        style={{ backgroundColor: "#FFF" }}
                        scrollEnabled={true}
                        renderTabBarItem={(props) => (
                            <View>
                                <TabBarItem
                                    {...props}
                                    activeColor='#40b46e'
                                    inactiveColor='black'
                                />
                            </View>
                        )}
                    />
                )}
            />
        </View>
    );
};
export default KYC;

const styles = StyleSheet.create({
    mainBody: {
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    verified: {
        padding: 10,
        borderColor: "#398d44",
        borderWidth: 1,
        width: "80%",
        marginTop: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    SectionStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        marginTop: 20,
        width: "100%"
    },
    buttonStyle: {
        backgroundColor: '#40b46e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    otpContainer: {
        marginHorizontal: 'auto',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    otpInputsContainer: {

    },
    otpPinCodeContainer: {
        marginHorizontal: 3
    },
    otpPinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    },
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
    data: {
        overflow: 'hidden',
        fontSize: 16,
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
    dateText: {
        fontSize: 12,
        color: 'rgb(130, 130, 130)'
    },
    title: {
        width: "70%",
        fontSize: 14,
        fontWeight: '200'
    },
    headings: {
        width: "50%",
        fontSize: 14,
        fontWeight: '200',
        textTransform: "capitalize",
        textAlign: "right"
    },
    titleContainer: {
        backgroundColor: "#e7e7e7",
        marginBottom: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        height: "5%"
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '200',
        backgroundColor: "transparent"
    },
    code: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bottom: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fafafa",
        padding: 10
    },
    bottomLeft: {
        width: 130,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    screens: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});
