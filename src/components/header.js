import { useNavigation, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Favorite from "./favorite";
import { ui } from "../utils/styles";

export default function Header({ imageRef, title  }) {

    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
                <Image style={styles.img} source={require("../../assets/back.png")} />
            </Pressable>
            { title && <Text style={[ui.text, {color: "#fff"}]}>{title}</Text> }
            { imageRef && <Favorite image={imageRef} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        height: 70,
        backgroundColor: "#332530",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    group: {
        justifyContent: "center",
    },
    img: {
        width: 30,
        height: 30,
    }

})