import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyButtonSecond, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'
import axios from 'axios'
import { MYAPP, apiURL, webURL } from '../../utils/localStorage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MyDimensi, colors, fonts } from '../../utils'
import SweetAlert from 'react-native-sweet-alert';
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

export default function BayarDetail({ navigation, route }) {
    const item = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();


    useEffect(() => {
        if (isFocus) {
            __getBayar();
        }

    }, [isFocus]);



    const __getBayar = () => {
        axios.post(apiURL + 'bayar', {
            fid_daftar: item.id,
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,

        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginVertical: 5,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginHorizontal: 20,
                }}>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                        Nomor KTP
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                        {item.nomor_ktp}
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                        Nama Jamaah
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                        {item.nama_jamaah}
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4 }}>
                        Paket
                    </Text>
                    <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                        {item.paket}
                    </Text>

                </View>

                <View style={{
                    marginVertical: 5,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginHorizontal: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Harga Paket
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                            {new Intl.NumberFormat().format(item.harga_paket)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Paspor{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.desc_paspor}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.paspor > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.paspor)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            addon{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.desc_addon}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.addon > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.addon)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Upgrade Room{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.desc_uproom}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.uproom > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.uproom)}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Upgrade Hotel{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.desc_uphotel}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.uphotel > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.uphotel)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Tambahan Lainnya{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.desc_lainnya}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.lainnya > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.lainnya)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Diskon
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.diskon > 0 ? '-' : ''} {new Intl.NumberFormat().format(item.diskon)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Total Transaksi
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 3 }}>
                            {new Intl.NumberFormat().format(item.total_transaksi)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Pajak
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            + {new Intl.NumberFormat().format(item.pajak)}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Total Biaya
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 2.5 }}>
                            {new Intl.NumberFormat().format(item.total)}
                        </Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: MyDimensi / 4, flex: 1, }}>
                            {(item.total - item.bayar) > 0 ? 'Kurang Bayar' : 'Lebih Bayar'}
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: MyDimensi / 3 }}>
                            {new Intl.NumberFormat().format((item.total - item.bayar) > 0 ? (item.total - item.bayar) : Math.abs(item.total - item.bayar))}
                        </Text>
                    </View>
                    <MyGap jarak={10} />
                    <MyButton warna={colors.primary} title="Update Pembayaran" onPress={() => navigation.navigate('BayarAdd', item)} />
                    <MyGap jarak={10} />
                    <MyButton warna={colors.danger} Icons="print-outline" title="Print Invoice" onPress={() => {
                        console.log(item);

                        Linking.openURL(webURL + `/paket/print/${item.id_paket}/${item.id_jamaah}`)
                    }} />


                </View>

                <View style={{
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,
                    flex: 1,
                    backgroundColor: colors.white,
                    marginHorizontal: 20,
                }}>
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                marginVertical: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                    }}>Tanggal Bayar</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                    }}>{moment(item.tanggal_bayar).format('DD MMMM YYYY')}</Text>

                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                    }}>{new Intl.NumberFormat().format(item.nominal)}</Text>

                                </View>

                                <View style={{
                                    paddingHorizontal: 5,
                                }}>

                                    {item.cek > 0 && <Icon type='ionicon' name='checkmark-circle' color={colors.success} size={12} />}


                                    {item.cek == 0 && <Icon type='ionicon' name='time' color={colors.danger} size={12} />}
                                </View>

                                {item.cek > 0 && <TouchableOpacity onPress={() => {

                                    Linking.openURL(webURL + `bayar/print/${item.id_bayar}`)
                                }} style={{
                                    backgroundColor: colors.danger,
                                    width: 40,
                                    borderRadius: 5,

                                }}>
                                    <Icon type='ionicon' name='print' size={20} color={colors.white} /></TouchableOpacity>}

                            </View>
                        )
                    }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})