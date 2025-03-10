import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, SafeAreaView, Alert, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import { MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'
import SweetAlert from 'react-native-sweet-alert';
export default function PaketDaftar({ navigation, route }) {
    const item = route.params.item;
    const user = route.params.user;
    console.log(user)
    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        fid_paket: item.id,
        input_by: user.id_pengguna,
        tipe: item.tipe,
        level: user.level,
        ref_pengguna: user.ref_pengguna,
        fid_jamaah: '',
        fid_tambahan: '',
        paspor: 0,
        addon: 0,
        uproom: 0,
        uphotel: 0,
        lainnya: 0,
        desc_paspor: '',
        desc_addon: '',
        desc_uproom: '',
        desc_uphotel: '',
        desc_lainnya: '',
        diskon: 0,
        pajak: 0,
        total: item.harga_paket,
    });

    const [jamaah, setJamaah] = useState([]);
    const [tambahan, setTambahan] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {


        __getTambahan();

    }, []);

    const sendData = () => {
        console.log(kirim);
        Alert.alert(MYAPP, 'Apakah kamu yakin akan simpan ini ?', [
            { text: 'Cek kembali' },
            {
                text: 'Simpan',
                onPress: () => {
                    setLoading(true);
                    axios.post(apiURL + 'insert_daftar', kirim).then(res => {
                        console.log(res.data)

                        if (res.data.status == 404) {
                            SweetAlert.showAlertWithOptions({
                                title: MYAPP,
                                subTitle: res.data.message,
                                style: 'error',
                                cancellable: true
                            });

                        } else {
                            SweetAlert.showAlertWithOptions({
                                title: MYAPP,
                                subTitle: res.data.message,
                                style: 'success',
                                cancellable: true
                            }, callback => {
                                navigation.replace('MainApp')
                            });

                        }
                    }).finally(() => {
                        setLoading(false);
                    })
                }
            }
        ])
    }




    const __getTambahan = () => {
        axios.post(apiURL + 'tambahan').then(res => {
            setTambahan(res.data);

            axios.post(apiURL + 'jamaah', {
                input_by: user.id_pengguna,
                level: user.level,
            }).then(resj => {
                console.log('jamaah', resj.data.data[0].value)
                setJamaah(resj.data.data);
                setKirim({
                    ...kirim,
                    fid_tambahan: res.data[0].value.split("#")[0],
                    addon: res.data[0].value.split("#")[1],
                    fid_jamaah: resj.data.data[0].value
                })

            }).finally(() => {
                setOpen(true)
            })



        })
    }

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={{
            flex: 1,
            // backgroundColor: colors.black
        }}>
            {/* <MyHeader judul="Daftarkan jamaah" onPress={() => navigation.goBack()} /> */}
            {open && <ScrollView showsVerticalScrollIndicato={false}>

                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 3.5,
                        color: colors.black,
                        textAlign: 'center'
                    }}>{item.paket}</Text>

                    <MyGap jarak={10} />
                    <MyPicker label="Pilih Jamaah" onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_jamaah: x
                        })
                    }} data={jamaah} />
                    <MyGap jarak={10} />
                    <MyPicker label="+ Paspor" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            paspor: parseFloat(x.split("#")[1]),
                            desc_paspor: x.split("#")[2],
                            total: parseFloat(item.harga_paket) +
                                parseFloat(kirim.addon) +
                                parseFloat(kirim.uproom) +
                                parseFloat(kirim.uphotel) +
                                parseFloat(kirim.lainnya) +
                                parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={10} />
                    <MyPicker label="+ Add on" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            addon: parseFloat(x.split("#")[1]),
                            desc_addon: x.split("#")[2],
                            total: parseFloat(item.harga_paket) +
                                parseFloat(kirim.paspor) +
                                parseFloat(kirim.uproom) +
                                parseFloat(kirim.uphotel) +
                                parseFloat(kirim.lainnya) +
                                parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={10} />
                    <MyPicker label="+ Upgrade Room" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            uproom: parseFloat(x.split("#")[1]),
                            desc_uproom: x.split("#")[2],
                            total: parseFloat(item.harga_paket) +
                                parseFloat(kirim.addon) +
                                parseFloat(kirim.paspor) +
                                parseFloat(kirim.uphotel) +
                                parseFloat(kirim.lainnya) +
                                parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={10} />
                    <MyPicker label="+ Upgrade Hotel" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            uphotel: parseFloat(x.split("#")[1]),
                            desc_uphotel: x.split("#")[2],
                            total: parseFloat(item.harga_paket) +
                                parseFloat(kirim.addon) +
                                parseFloat(kirim.paspor) +
                                parseFloat(kirim.uproom) +
                                parseFloat(kirim.lainnya) +
                                parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={10} />
                    <MyPicker label="+ Tambahan Lain" data={tambahan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            fid_tambahan: x.split("#")[0],
                            lainnya: parseFloat(x.split("#")[1]),
                            desc_lainnya: x.split("#")[2],
                            total: parseFloat(item.harga_paket) +
                                parseFloat(kirim.addon) +
                                parseFloat(kirim.paspor) +
                                parseFloat(kirim.uphotel) +
                                parseFloat(kirim.uproom) +
                                parseFloat(x.split("#")[1])
                        });


                    }} />
                    <MyGap jarak={10} />
                    <MyInput label="Diskon" keyboardType='number-pad' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            diskon: x,
                        })
                    }} />
                    <MyGap jarak={20} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Harga Paket</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format(item.harga_paket)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Paspor</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{kirim.paspor > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.paspor)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Add on</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right',
                        }}>{kirim.addon > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.addon)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Upgrade Room</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{kirim.uproom > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.uproom)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Upgrade Hotel</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{kirim.uphotel > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.uphotel)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Tambahan lainnya</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{kirim.lainnya > 0 ? '+' : ''} {new Intl.NumberFormat().format(kirim.lainnya)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Diskon</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{kirim.diskon > 0 ? '-' : ''} {new Intl.NumberFormat().format(kirim.diskon)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Total</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 2.5,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format(kirim.total - kirim.diskon)}</Text>
                    </View>
                    {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Pajak</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 3,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format(kirim.pajak)}</Text>
                    </View> */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: MyDimensi / 4,
                            flex: 1,
                        }}>Total Biaya</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 2.5,
                            color: colors.black,
                            textAlign: 'right'
                        }}>{new Intl.NumberFormat().format((kirim.total - kirim.diskon) + kirim.pajak)}</Text>
                    </View>

                    <MyGap jarak={20} />
                    {!loading && <MyButton title="Simpan Data" warna={colors.primary} onPress={sendData} />}

                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
                <MyGap jarak={10} />
            </ScrollView>}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})