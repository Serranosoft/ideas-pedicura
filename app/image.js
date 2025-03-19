import { Stack, useLocalSearchParams } from "expo-router";
import { Image as ReactNativeImage, Pressable, StyleSheet, ToastAndroid, View, Alert } from "react-native";
import Header from "../src/components/header";
import { ui } from "../src/utils/styles";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

export default function ImageWrapper() {

    const params = useLocalSearchParams();
    const { image } = params;
    const imageRef = image.substring(image.lastIndexOf("/") + 1, image.lastIndexOf("."));
    
    async function requestPermissions() {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                downloadImage();
            } else {
                if (Platform.OS === "android") {
                    ToastAndroid.showWithGravityAndOffset(
                        "No tengo permisos para acceder a la galería de su dispositivo",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                } else {
                    Alert.alert("No tengo permisos para acceder a la galería de su dispositivo");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function downloadImage() {
        const url = `https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/${imageRef}.jpg`;

        try {
            const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + `${imageRef}.jpg`);
            // Agregar la imagen al álbum
            const asset = await MediaLibrary.createAssetAsync(uri);

            // Obtener el álbum existente o crearlo
            let album = await MediaLibrary.getAlbumAsync("Diseños de uñas de pies");
            if (!album) {
                album = await MediaLibrary.createAlbumAsync("Diseños de uñas de pies", asset, true);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
            }

            if (Platform.OS === "android") {
                ToastAndroid.showWithGravityAndOffset(
                    "Imagen guardada en en el albúm «Diseños de uñas de pies»",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                Alert.alert("Imagen guardada en en el albúm «Diseños de uñas de pies»");
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <Header imageRef={imageRef} withFavorite={true} /> }} />
            <ImageZoom
                onResetAnimationEnd={false}
                minScale={1}
                maxScale={3}
                uri={ image }
                isDoubleTapEnabled
            />
            
            <Pressable onPress={requestPermissions} style={[ui.floatingWrapper, { left: 15 }]}>
                <ReactNativeImage style={[ui.floatingImg, { marginBottom: 6, marginLeft: 1 }]} source={require("../assets/download.png")} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },

    image: {
        width: "100%",
        height: "100%",
    }
})