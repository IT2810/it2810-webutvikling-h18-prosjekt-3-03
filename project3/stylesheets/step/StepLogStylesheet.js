import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container1: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateText: {
        paddingTop: 4,
        margin: "4%",
        marginRight: 0,
        fontSize: 18,
        flexDirection: 'row',
        width: "48%",
    },
    stepText: {
        paddingTop: 6,
        margin: "4%",
        marginLeft: "2%",
        fontSize: 14,
        flexDirection: 'row',
    },
    starImg: {
        margin: "4%",
    },
    stepImg: {
        marginTop: "5%",
    },
    itemSeperator: {
        height: 1,
        width: "96%",
        backgroundColor: "#CED0CE",
        marginLeft: "2%",
    },
    container2: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listHeader: {
        width: "100%",
        height: 40,
        backgroundColor: "#555555",
        alignItems: "center",

        marginTop: "0%",
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: 5,
    },
});
