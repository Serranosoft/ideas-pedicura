import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


export const ui = {
    img: {
        aspectRatio: 1,
        width: 35,
    },
    text: {
        fontFamily: "Medium",
        color: "black",
        fontSize: getFontSize(16.5),
    },
    h1: {
        fontSize: getFontSize(60),
        fontFamily: "Semibold",
        lineHeight: 65,
    },
    h2: {
        fontFamily: "Bold",
        color: "black",
        fontSize: getFontSize(34),
        textAlign: "center"
    },
    h3: {
        fontFamily: "Regular",
        color: "black",
        fontSize: getFontSize(25),
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderWidth: 3,
        borderColor: "#AF72A2",
        backgroundColor: "rgba(255, 133, 184, 0.25)", 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    floatingWrapper: {
        backgroundColor: "#AF72A2", 
        width: 65, 
        height: 65, 
        borderRadius: 100, 
        position: "absolute", 
        bottom: 15, 
        right: 15, 
        justifyContent: "center", 
        alignItems: "center",
    },
    floatingImg: {
        width: 40,
        height: 40,
        marginTop: 3,
    }

}