import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import SweetAlert from 'react-native-sweet-alert'

export default function TarikSaldo({ navigation, route }) {

    const MyBack = () => {
        navigation.goBack();
    }

    const [kirim, setKirim] = useState({
        jumlah: 0,
    })

    const [data, setData] = useState({
        fee: 0,
        royalti: 0,
        tarik: 0,
        total: 0,
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            __getDaftar();
        }
    }, [isFocus]);

    const [user, setUser] = useState({});
    const __getDaftar = () => {
        getData('user').then(uu => {
            setUser(uu)
            setKirim({
                ...kirim,
                fid_pengguna: uu.id_pengguna
            })
            axios.post(apiURL + 'saldo', {
                fid_pengguna: uu.id_pengguna
            }).then(res => {
                console.log(res.data);
                setData(res.data)

            })
        })
    }
    var totalBayar = 0;
    const sendServer = () => {
        console.log(kirim);
        if (kirim.jumlah > data.total) {
            SweetAlert.showAlertWithOptions({
                title: MYAPP,
                subTitle: 'Maaf saldo kamu tidak cukup  !',
                style: 'error',
                cancellable: true
            });
        } else {
            setLoading(true)
            axios.post(apiURL + 'insert_tarik', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    SweetAlert.showAlertWithOptions({
                        title: MYAPP,
                        subTitle: res.data.message,
                        style: 'success',
                        cancellable: true
                    }, callback => {
                        navigation.navigate('TarikSaldoDetail', user)
                    });
                    setKirim({
                        ...kirim,
                        jumlah: 0,
                    })
                }
            }).finally(() => {
                setLoading(false)
            })

        }
    }
    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={{
            flex: 1,
        }}>
            {/* MAIN */}
            <ScrollView style={{ padding: 20, }}>
                {/* TANGGAL KEBERANGKATAN */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4,
                        flex: 1,
                    }}>Saldo Fee</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 3,
                        color: colors.black,
                        textAlign: 'right'
                    }}>{new Intl.NumberFormat().format(data.fee)}</Text>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4,
                        flex: 1,
                    }}>Saldo Royalti</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 3,
                        color: colors.black,
                        textAlign: 'right'
                    }}>{new Intl.NumberFormat().format(data.royalti)}</Text>
                </View>
                <View style={{
                    marginTop: 10,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderBottomcolor: colors.black,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4,
                        flex: 1,
                    }}>Total Saldo Saya</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2.5,
                        color: colors.black,
                        textAlign: 'right'
                    }}>{new Intl.NumberFormat().format(parseFloat(data.fee) + (data.royalti > 0 ? parseFloat(data.royalti) : 0))}</Text>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4,
                        flex: 1,
                    }}>Saldo Sudah Diterima</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 3,
                        color: colors.black,
                        textAlign: 'right'
                    }}>-{new Intl.NumberFormat().format(data.tarik)}</Text>
                </View>
                <View style={{
                    marginTop: 10,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderBottomcolor: colors.black,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4,
                        flex: 1,
                    }}>Total Saldo dapat ditarik</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2.5,
                        color: colors.black,
                        textAlign: 'right'
                    }}>{new Intl.NumberFormat().format(data.total)}</Text>
                </View>
                <MyGap jarak={20} />
                <MyInput placeholder="Masukan nominal" label="Tarik Saldo" value={kirim.jumlah} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        jumlah: x
                    })
                }} keyboardType='number-pad' />
                <MyGap jarak={10} />
                {!loading && <MyButton onPress={sendServer} warna={colors.primary} title="Tarik Sekarang" Icons="filter" />}

                {loading &&
                    <ActivityIndicator size="large" color={colors.primary} />
                }
                <MyGap jarak={20} />
            </ScrollView>
            <View style={{
                padding: 20
            }}>
                <MyButton onPress={() => navigation.navigate('TarikSaldoDetail', user)} warna={colors.primary} title="Riwayat Tarik Saldo" />
            </View>
        </ImageBackground >
    )
}