import { View, Text, TouchableWithoutFeedback, ImageBackground, Image, ActivityIndicator, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyButtonSecond, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'
import axios from 'axios'
import { MYAPP, apiURL, webURL } from '../../utils/localStorage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MyDimensi, colors, fonts } from '../../utils'
import SweetAlert from 'react-native-sweet-alert';
import { showMessage } from 'react-native-flash-message'
import FastImage from 'react-native-fast-image'
export default function JamaahEdit({ navigation, route }) {

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



    const MyBack = () => {
        navigation.goBack();
    }
    const [kirim, setKirim] = useState(route.params)
    const [pengguna, setPengguna] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        __getPengguna();
        requestCameraPermission();
    }, []);

    const __sendServer = () => {
        // console.log(kirim);
        // setLoading(true);
        if (kirim.nama_jamaah.length == 0) {
            showMessage({ message: 'Nama wajib di isi !' })
        } else if (kirim.telepon_jamaah.length == 0) {
            showMessage({ message: 'Telepon wajib di isi !' })
        } else if (kirim.nomor_ktp.length == 0) {
            showMessage({ message: 'nomor ktp wajib di isi !' })
        } else {
            setLoading(true);
            axios
                .post(apiURL + 'update_jamaah', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
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
                        },
                            callback => navigation.replace('MainApp'));

                    }


                });
        }


    }

    const [open, setOpen] = useState(false);
    const __getPengguna = () => {
        // axios.post(apiURL + 'pengguna', {
        //     id_pengguna: route.params.id_pengguna
        // }).then(res => {
        //     console.log(res.data);
        //     setPengguna(res.data);
        //     setKirim({
        //         ...kirim,
        //         fid_pengguna: res.data[0].value,
        //     });
        setOpen(true);
        // })
    }
    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={{
            flex: 1,
        }}>
            {/* HEADERS */}
            <MyHeader onPress={MyBack} judul='Edit Jamaah' />

            {/* MAIN */}
            {open && <ScrollView style={{ padding: 20, }}>
                {/* REFERENSI */}


                {/* NAMA LENGKAP */}
                <MyInput value={kirim.nama_jamaah} onChangeText={x => setKirim({ ...kirim, nama_jamaah: x })} label="Nama Lengkap" placeholder="Nama Lengkap" />

                <MyGap jarak={10} />

                {/* NAMA LENGKAP */}
                <MyInput label="Alamat" onChangeText={x => setKirim({ ...kirim, alamat_jamaah: x })} value={kirim.alamat_jamaah} placeholder="Alamat Lengkap" />
                <MyGap jarak={10} />
                {/* NAMA LENGKAP */}
                <MyInput keyboardType='phone-pad' label="Telepon" placeholder="Nomor telepon" onChangeText={x => setKirim({ ...kirim, telepon_jamaah: x })} value={kirim.telepon_jamaah} />

                <MyGap jarak={10} />
                <MyInput label="Nomor KTP" keyboardType='number-pad' value={kirim.nomor_ktp} maxLength={16} placeholder="Nomor KTP" onChangeText={x => setKirim({ ...kirim, nomor_ktp: x })} />
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Foto KTP</Text>
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
                                    console.log('==========================================================>>>>>>>>>>>');
                                    console.log('===============\n', response.base64);
                                    if (!response.didCancel) {
                                        setKirim({
                                            ...kirim,
                                            foto_ktp: `data:${response.type};base64, ${response.base64}`,
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
                                            foto_ktp: `data:${response.type};base64, ${response.base64}`,
                                        });
                                    }
                                });
                            }
                        }
                    ])}


                >
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_ktp.length > 300 ? kirim.foto_ktp : webURL + kirim.foto_ktp
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={10} />
                {/* NAMA LENGKAP */}
                <MyInput value={kirim.nomor_paspor} onChangeText={x => setKirim({ ...kirim, nomor_paspor: x })} label="Nomor Paspor" placeholder="Nomor Paspor" />
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Foto Paspor</Text>
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
                                            foto_paspor: `data:${response.type};base64, ${response.base64}`,
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
                                            foto_paspor: `data:${response.type};base64, ${response.base64}`,
                                        });
                                    }
                                });
                            }
                        }
                    ])}>
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_paspor.length > 300 ? kirim.foto_paspor : webURL + kirim.foto_paspor
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Foto Kartu Keluarga</Text>
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
                                            foto_kk: `data:${response.type};base64, ${response.base64}`,
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
                                            foto_kk: `data:${response.type};base64, ${response.base64}`,
                                        });
                                    }
                                });
                            }
                        }
                    ])}
                >
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_kk.length > 300 ? kirim.foto_kk : webURL + kirim.foto_kk
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Foto Buku Nikah / Ijazah / Akta lahir</Text>
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
                                            foto_tambahan: `data:${response.type};base64, ${response.base64}`,
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
                                            foto_tambahan: `data:${response.type};base64, ${response.base64}`,
                                        });
                                    }
                                });
                            }
                        }
                    ])}
                >
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>

                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_tambahan.length > 300 ? kirim.foto_tambahan : webURL + kirim.foto_tambahan
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Foto Surat Keterangan
                </Text>
                <TouchableWithoutFeedback onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
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
                                        foto_keterangan: `data:${response.type};base64, ${response.base64}`,
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
                                        foto_keterangan: `data:${response.type};base64, ${response.base64}`,
                                    });
                                }
                            });
                        }
                    }
                ])}>
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_keterangan.length > 300 ? kirim.foto_keterangan : webURL + kirim.foto_keterangan
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: colors.black,
                    marginBottom: 10,
                }}>Upload Pas Foto Latar Belakang Putih
                </Text>
                <TouchableWithoutFeedback onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
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
                                        foto_wajah: `data:${response.type};base64, ${response.base64}`,
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
                                        foto_wajah: `data:${response.type};base64, ${response.base64}`,
                                    });
                                }
                            });
                        }
                    }
                ])}>
                    <View style={{
                        backgroundcolor: colors.black,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <FastImage resizeMode={FastImage.resizeMode.cover} style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_wajah.length > 300 ? kirim.foto_wajah : webURL + kirim.foto_wajah
                        }} />
                    </View>
                </TouchableWithoutFeedback>


                <MyGap jarak={20} />

                {!loading && <MyButtonSecond title="Simpan Perubahan" onPress={__sendServer} />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />}

                <MyGap jarak={30} />

            </ScrollView>}



        </ImageBackground>
    )
}