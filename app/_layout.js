import { SplashScreen, Stack, router } from "expo-router";
import { View, StatusBar, StyleSheet, Image, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createRef, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { DataContext } from "../src/DataContext";
import { ui } from "../src/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdsHandler from "../src/components/AdsHandler";

SplashScreen.preventAutoHideAsync();
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Regular": require("../assets/fonts/AncizarSans-Regular.ttf"),
        "Medium": require("../assets/fonts/AncizarSans-Medium.ttf"),
        "Semibold": require("../assets/fonts/AncizarSans-Bold.ttf"),
        "Bold": require("../assets/fonts/AncizarSans-ExtraBold.ttf")
    });

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adsLoaded) {
            if (adTrigger > 3) {
                adsHandlerRef.current.showIntersitialAd();
                setAdTrigger(0);
            }
        }
            
    }, [adTrigger])


    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        async function getFavorites() {
            const value = await AsyncStorage.getItem("favorites");
            if (value !== null) {
                setFavorites(JSON.parse(value));
            }
        }
        getFavorites();
    }, [])

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />
            <GestureHandlerRootView style={styles.wrapper}>
                <DataContext.Provider value={{ favorites: favorites, setFavorites: setFavorites, setAdTrigger: setAdTrigger, setShowOpenAd: setShowOpenAd }}>
                    <Stack />
                    <Pressable onPress={() => router.push("/favorites")} style={ui.floatingWrapper}>
                        <Image style={ui.floatingImg} source={require("../assets/favorites.png")} />
                    </Pressable>
                </DataContext.Provider>
            </GestureHandlerRootView>
            <StatusBar style="light" backgroundColor={"#fff"} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})