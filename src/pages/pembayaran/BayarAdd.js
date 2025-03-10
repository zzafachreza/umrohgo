import { View, Text, TouchableWithoutFeedback, Image, ActivityIndicator, StyleSheet, SafeAreaView, Alert, PermissionsAndroid, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyButtonSecond, MyCalendar, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'
import axios from 'axios'
import { MYAPP, apiURL } from '../../utils/localStorage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Color, MyDimensi, colors, fonts } from '../../utils'
import SweetAlert from 'react-native-sweet-alert';
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function BayarAdd({ navigation, route }) {

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Akses Kamera',
                    message: 'Izinkan aplikasi untuk akses kamera',
                    buttonNeutral: 'Nanti',
                    buttonNegative: 'Tolak',
                    buttonPositive: 'Izinkan',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const item = route.params;
    console.log(item);
    const [loading, setLoading] = useState(false);

    const sendServer = () => {
        console.log(kirim);

        if (kirim.foto_bayar == 'https://zavalabs.com/nogambar.jpg') {
            showMessage({
                message: 'Bukti Transfer Wajib di isi !'
            })
        } else if (kirim.nominal.length == 0) {
            showMessage({
                message: 'Nominal bayar Wajib di isi !'
            })
        } else if (parseFloat(kirim.nominal) <= 10000) {
            showMessage({
                message: 'Nominal bayar minimal 10.000'
            })
        } else if (kirim.catatan.length == 0) {
            showMessage({
                message: 'Harap masukan catatan'
            })
        } else {
            Alert.alert(MYAPP, 'Apakah kamu yakin akan simpan ini ?', [
                {
                    text: 'CEK ULANG'
                }, {
                    text: 'SIMPAN',
                    onPress: () => {
                        setLoading(true)
                        axios.post(apiURL + 'insert_bayar', kirim).then(res => {
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
                                }, callback => navigation.goBack());

                            }
                        }).finally(() => {
                            setLoading(false)
                        })
                    }
                }
            ])

        }
    }

    const [kirim, setKirim] = useState({
        fid_daftar: item.id,
        tanggal_bayar: moment().format('YYYY-MM-DD'),
        nominal: '',
        catatan: '',
        foto_bayar: 'https://zavalabs.com/nogambar.jpg',
    })

    useEffect(() => {
        requestCameraPermission();
    }, [])

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={{
            flex: 1,
        }}>
            <MyHeader judul="Update Pembayaran" onPress={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    marginVertical: 5,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                    padding: 10,
                    marginHorizontal: 20,
                }}>
                    {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Harga Paket
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], ontSize: MyDimensi / 4 }}>
                            {new Intl.NumberFormat().format(item.harga_paket)}
                        </Text>
                    </View> */}
                    {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 4, flex: 1, }}>
                            Tambahan/addon{'\n'}
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 5
                            }}>{item.deskripsi}</Text>
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[400], ontSize: MyDimensi / 4 }}>
                            {item.addon > 0 ? '+' : ''} {new Intl.NumberFormat().format(item.addon)}
                        </Text>
                    </View> */}

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
                            Kurang Bayar
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: MyDimensi / 3 }}>
                            {new Intl.NumberFormat().format((item.total - item.bayar) - kirim.nominal)}
                        </Text>
                    </View>



                </View>
                <View style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                }}>
                    <MyCalendar value={kirim.tanggal_bayar} onDateChange={x => setKirim({
                        ...kirim,
                        tanggal_bayar: x
                    })} label="Tanggal Bayar" />
                    <MyGap jarak={10} />
                    <MyInput label="Nominal" onChangeText={x => setKirim({
                        ...kirim,
                        nominal: x
                    })} keyboardType='number-pad' />
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4,
                        color: colors.white,
                        marginBottom: 10,
                    }}>Upload bukti transfer</Text>
                    <TouchableWithoutFeedback
                        onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
                            {
                                'text': 'cancel'
                            },
                            {
                                text: 'GALERI',
                                onPress: () => {
                                    launchImageLibrary({
                                        includeBase64: true,
                                        quality: 1,
                                        mediaType: "photo",
                                        maxWidth: 1000,
                                        maxHeight: 1000
                                    }, response => {
                                        // console.log('All Response = ', response);

                                        if (!response.didCancel) {
                                            setKirim({
                                                ...kirim,
                                                foto_bayar: `data:${response.type};base64, ${response.base64}`,
                                            });
                                        }
                                    });
                                }
                            },
                            {
                                text: 'KAMERA',
                                onPress: () => {
                                    launchCamera({
                                        includeBase64: true,
                                        quality: 1,
                                        mediaType: "photo",
                                        maxWidth: 1000,
                                        maxHeight: 1000
                                    }, response => {
                                        // console.log('All Response = ', response);
                                        if (!response.didCancel) {
                                            setKirim({
                                                ...kirim,
                                                foto_bayar: `data:${response.type};base64, ${response.base64}`,
                                            });
                                        }
                                    });
                                }
                            }
                        ])}
                    >
                        <View style={{
                            borderWidth: 1,
                            borderColor: Color.blueGray[200],
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}>
                            <Image style={{
                                width: '100%',
                                height: 200,
                                resizeMode: 'contain'
                            }} source={{
                                uri: kirim.foto_bayar
                            }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <MyGap jarak={10} />
                    <MyInput label="Catatan (DP / Termin / Pelunasan)" onChangeText={x => setKirim({
                        ...kirim,
                        catatan: x
                    })} />
                    <MyGap jarak={20} />
                    {!loading && <MyButton warna={colors.primary} title="Simpan Pembayaran" onPress={sendServer} />}
                    {loading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})