import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { MyButton, MyGap, MyHeader } from '../../components';
import { getData, webURL } from '../../utils/localStorage';
import { Color, MyDimensi, colors, fonts, windowWidth } from '../../utils';

export default function PaketDetail({ navigation, route }) {
    const item = useMemo(() => route.params, [route.params]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getData('user').then(setUser);
    }, []);

    const Mylist = useCallback(({ label, value }) => (
        <View style={styles.listContainer}>
            <Text style={styles.listLabel}>{label}</Text>
            <Text style={styles.listValue}>{value}</Text>
        </View>
    ), []);

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>
            <MyHeader judul="Paket Detail" onPress={navigation.goBack} />
            <ScrollView removeClippedSubviews showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{item.paket}</Text>
                <FastImage
                    source={{ uri: webURL + item.image }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.content}>
                    <Mylist label="Tanggal Keberangkatan" value={moment(item.tanggal_keberangkatan).format('dddd, DD MMMM YYYY')} />
                    <Mylist label="Durasi" value={`${item.hari} hari`} />
                    <Mylist label="Hotel Madinah" value={item.hotel_madinah} />
                    <Mylist label="Hotel Mekah" value={item.hotel_mekah} />
                    <Mylist label="Maskapai" value={item.maskapai} />
                    <Mylist label="Rute" value={item.rute} />
                    <Mylist label="Harga" value={new Intl.NumberFormat().format(item.harga_paket)} />
                    <Mylist label="Jumlah Seat" value={item.seat} />
                    <Mylist label="Seat Terisi" value={item.terisi} />
                    <Mylist label="Seat Tersedia" value={item.sisa} />
                    <MyGap jarak={10} />
                    {item.sisa > 0 && user && (
                        <MyButton title="Daftarkan Jamaah" onPress={() => navigation.navigate('PaketDaftar', { item, user })} />
                    )}
                </View>
                <MyGap jarak={20} />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 3,
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: windowWidth,
    },
    content: { padding: 10 },
    listContainer: {
        borderColor: Color.blueGray[200],
        borderRadius: 10,
        backgroundColor: colors.white,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
    },
    listLabel: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 4,
    },
    listValue: {
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4,
    },
});