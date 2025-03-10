import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Color, MyDimensi, colors, fonts } from '../../utils';
import FastImage from 'react-native-fast-image';
import { webURL } from '../../utils/localStorage';

export default function JamaahDetail({ navigation, route }) {
    const item = route.params || {};

    const MyList = ({ label, value }) => (
        <View style={styles.listContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    const renderImageSection = (title, uri) => (
        <View style={styles.imageContainer}>
            <Text style={styles.imageTitle}>{title}</Text>
            <FastImage source={{ uri: webURL + uri }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.background}>
            <MyHeader judul="Detail Jamaah" onPress={() => navigation.goBack()} />
            <ScrollView>
                <MyList label="Nama Jamaah" value={item.nama_jamaah} />
                <MyList label="Alamat Jamaah" value={item.alamat_jamaah} />
                <MyList label="Nomor KTP" value={item.nomor_ktp} />
                {renderImageSection("Foto KTP", item.foto_ktp)}
                <MyList label="Nomor Paspor" value={item.nomor_paspor} />
                {renderImageSection("Foto Paspor", item.foto_paspor)}
                {renderImageSection("Foto Kartu Keluarga", item.foto_kk)}
                {renderImageSection("Foto Buku Nikah / Ijazah / Akta Kelahiran", item.foto_tambahan)}
                {renderImageSection("Pas Foto Latar Belakang Putih", item.foto_wajah)}
                {renderImageSection("Foto Keterangan", item.foto_keterangan)}
                <View style={styles.buttonContainer}>
                    <MyButton onPress={() => navigation.navigate('JamaahAgen', item)} warna={colors.primary} title="Jadikan Jamaah Agen" />
                    <MyGap jarak={20} />
                    <MyButton onPress={() => navigation.navigate('JamaahEdit', item)} colorText={colors.white} warna={colors.black} title="Edit Data Jamaah" />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    listContainer: {
        borderWidth: 1,
        borderColor: Color.blueGray[200],
        marginVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginHorizontal: 20,
        backgroundColor: colors.white,
    },
    label: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 4,
    },
    value: {
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4,
    },
    imageContainer: {
        marginVertical: 10,
        backgroundColor: colors.white,
        marginHorizontal: 20,
        padding: 10,
    },
    imageTitle: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 4,
        color: colors.black,
        marginBottom: 8,
    },
    image: {
        borderRadius: 5,
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        padding: 20,
    },
});
