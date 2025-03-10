import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View, Text, FlatList, TouchableWithoutFeedback,
    ImageBackground, ActivityIndicator
} from 'react-native';
import { MyHeader } from '../../components';
import { apiURL, webURL } from '../../utils/localStorage';
import { Color, MyDimensi, colors, fonts, windowHeight } from '../../utils';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

const LazyImage = ({ uri }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <View style={styles.imageContainer}>
            {isImageLoading && (
                <ActivityIndicator style={styles.imageLoader} size="small" color={colors.primary} />
            )}
            <FastImage
                source={{ uri }}
                style={styles.image}
                onLoadEnd={() => setIsImageLoading(false)}
            />
        </View>
    );
};

export default function SeatUpdate({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        __getPaket();
    }, []);

    const __getPaket = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${apiURL}paket`);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching paket:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fungsi untuk render setiap item
    const renderItem = useCallback(({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('PaketDetail', item)}>
            <View style={styles.card}>
                <LazyImage uri={webURL + item.image} />
                <View style={styles.infoContainer}>
                    <Text style={[styles.tipe, { color: item.tipe === 'Promo' ? colors.danger : colors.black }]}>
                        {item.tipe}
                    </Text>
                    <Text style={styles.paket}>{item.paket}</Text>
                    <View style={styles.row}>
                        <Icon type='ionicon' name='calendar-outline' size={MyDimensi / 5} />
                        <Text style={styles.rowText}>
                            {moment(item.tanggal_keberangkatan).format('DD MMMM YYYY')}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon type='ionicon' name='time-outline' size={MyDimensi / 5} />
                        <Text style={styles.rowText}>{item.hari} Hari</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                        <View style={styles.row}>
                            <Icon type='ionicon' name='man' size={MyDimensi / 3} />
                            <Text style={{
                                ...styles.rowText,
                                fontFamily: fonts.secondary[800],
                            }}>{item.seat}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon color={colors.primary} type='ionicon' name='checkmark-circle' size={MyDimensi / 3} />

                            <Text style={{
                                ...styles.rowText,
                                fontFamily: fonts.secondary[800],
                            }}>{item.terisi}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon type='ionicon' name='man' color={colors.success} size={MyDimensi / 3} />
                            <Text style={{
                                ...styles.rowText,
                                fontFamily: fonts.secondary[800],
                            }}>{item.sisa}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ), [navigation]);

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>

            <View style={styles.content}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={loading && <ActivityIndicator size="large" color={colors.black} />}
                />
            </View>
        </ImageBackground>
    );
}

// **Styles**
const styles = {
    container: { flex: 1 },
    content: { flex: 1, padding: 20 },
    card: {
        borderColor: Color.blueGray[200],
        height: windowHeight / 5,
        borderWidth: 1,
        marginVertical: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 0.5,
        width: '100%',
        height: windowHeight / 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageLoader: {
        position: 'absolute',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    tipe: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 5,
    },
    paket: {
        fontFamily: fonts.secondary[400],
        fontSize: MyDimensi / 5,
        color: colors.black,
    },
    row: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        left: 5,
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 5,
        color: colors.black,
    },
    harga: {
        marginTop: 10,
        fontFamily: fonts.primary[800],
        fontSize: MyDimensi / 3.5,
        color: colors.primary,
    },
};

