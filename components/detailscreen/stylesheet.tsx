import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "100%",
        width: "100%"
    },
    contest: {
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
        height: 170,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        overflow: "hidden"
    },
    myContest: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 15,
        borderRadius: 15,
        height: 'auto',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        zIndex: 100,
        overflow: "hidden"
    },
    commentary: {
        margin: 10,
        borderRadius: 10,
        height: 'auto',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
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
    pool: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        color: 'white',
        height: 40,
        padding: 2,
    },
    poolEnd: {
        backgroundColor: 'white',
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        color: 'white',
        height: 40,
        padding: 2,
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
    },
    contestTop: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 2,
        paddingBottom: 0
    },
    slider: {
        paddingHorizontal: 10
    },
    wholeTeamContainer: {
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
        height: 280,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: "hidden",
        backgroundColor: '#109e38',
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    date: {
        fontSize: 10
    },
    info: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        elevation: 15,
    },
    singleInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 2,
        backgroundColor: "#FFFFFF"
    },
    teamName: {
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: "#0e9b2c",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    teamTop: {
        backgroundColor: '#109e38',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 180,
        width: '100%'
    },
    teamInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        position: "relative"
    },
    captainNote: {
        position: "absolute",
        borderRadius: 12.5,
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        top: "-5%",
        left: "20%",
        backgroundColor: "#000",
        zIndex: 10
    },
    teamInfoA: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '15%'
    },
    light: {
        color: 'rgb(119, 119, 119)'
    },
    bright: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 12
    },
    createButton: {
        color: '#FFF',

    },
    buttonStyle: {
        backgroundColor: '#3d7940',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#3d7940',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 2,
        borderRadius: 15,
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5
    },
    create: {
        backgroundColor: '#030303',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'row',
        height: 50,
        padding: 2,
        borderRadius: 25,
        width: '100%',
        marginVertical: 5,
        paddingVertical: 10
    },
    createTeam: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'row',
        height: 50,
        padding: 2,
        marginVertical: 5,
        paddingVertical: 10
    },
    player: {
        color: "#FFFFFF",
        textTransform: "capitalize"
    },
    icon: {
        marginRight: 5
    },
    myConTop: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        padding: 2,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    myConBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        padding: 2,
        paddingHorizontal: 15,
        backgroundColor: "transparent"
    },
    myConMiddle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        padding: 2,
        paddingHorizontal: 15
    },
    conBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        paddingHorizontal: 10
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    circle: {
        borderRadius: 10,
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    bigCircle: {
        borderRadius: 15,
        borderColor: '#CCCCCC',
        height: 30,
        width: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bottom: {
        backgroundColor: 'rgb(254, 244, 222)'
    },
    commText: {
        marginLeft: 10
    },
    overBreak: {
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: 'rgb(204, 204, 204)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        paddingVertical: 5
    },
    left: {
        width: 40
    },
    separator: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    wicket: {
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: 'red',
        borderColor: 'red',
        marginBottom: 2
    },
    four: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    six: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    text: {
        width: 270
    },
    cText: {
        textAlign: "left",
        width: 330
    },
    spots: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 10
    },
    bottomText: {
        fontSize: 14,
        fontWeight: "600"
    },
    winText: {
        color: '#109e38'
    }
});