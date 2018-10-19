import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 0.5,
        marginTop: "12%",
        marginLeft: "7%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    sContainer2: {
        flex: 0.5,
        alignItems: "center",
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    img: {
        margin: "2%",
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 80,
        justifyContent: "center",
        textAlign: "center",
        fontStyle: "italic",
    },
    todayHeader: {
        fontSize: 20,
    },
    todayText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
