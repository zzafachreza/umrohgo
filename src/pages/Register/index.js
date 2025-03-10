import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ImageBackground,
    PermissionsAndroid,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Color, colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image'
export default function Register({ navigation }) {
    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Akses Kamera',
                    message: 'Izinkan aplikasi untuk akses kamera',
                    buttonNeutral: 'Nanti',
                    buttonNegative: 'Tolak',
                    buttonPositive: 'Izinkan',
                },
            );
        } catch (err) {
            console.warn(err);
        }
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        api_token: api_token,
        username: '',
        nama_lengkap: '',
        telepon: '',
        alamat: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        bank: '',
        rekening: '',
        foto_ktpagen: 'https://zavalabs.com/nogambar.jpg',
        password: '',
        repassword: '',
    });

    const simpan = () => {
        if (!data.nama_lengkap || !data.username || !data.telepon || !data.password) {
            showMessage({ message: 'Formulir pendaftaran tidak boleh kosong!', type: 'danger' });
            return;
        }

        if (data.password !== data.repassword) {
            showMessage({ message: 'Kata sandi tidak cocok!', type: 'danger' });
            return;
        }

        setLoading(true);
        axios.post(apiURL + 'register', data).then(res => {
            console.log(res.data)
            setLoading(false);
            Alert.alert(MYAPP, res.data.message, [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
        }).catch((error) => {
            setLoading(false);
            console.log(error.data)
            showMessage({ message: 'Terjadi kesalahan, coba lagi.', type: 'danger' });
        });
    };

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.background}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
                <ScrollView

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                    <FastImage source={require('../../assets/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>DAFTAR</Text>
                    <Text style={styles.subtitle}>Silahkan daftar agar bisa login</Text>

                    <MyInput label='Nama Lengkap' placeholder="Masukan nama lengkap" onChangeText={x => setData({ ...data, nama_lengkap: x })} iconname='person' />
                    <MyGap jarak={20} />
                    <MyInput label='Username' placeholder="Masukan username" onChangeText={x => setData({ ...data, username: x })} iconname='person' />
                    <MyGap jarak={20} />
                    <MyInput label='Nomor Telepon' placeholder="Masukan nomor telepon" keyboardType='phone-pad' onChangeText={x => setData({ ...data, telepon: x })} iconname='call' />
                    <MyGap jarak={20} />
                    <MyInput label='Alamat' placeholder="Masukan alamat" onChangeText={x => setData({ ...data, alamat: x })} iconname='home' />
                    <MyGap jarak={20} />
                    <MyCalendar label='Tanggal Lahir' onDateChange={x => setData({ ...data, tanggal_lahir: x })} value={data.tanggal_lahir} iconname='calendar' />
                    <MyGap jarak={20} />
                    <Text style={styles.label}>Upload Foto KTP</Text>
                    <TouchableWithoutFeedback onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
                        { text: 'Batal' },
                        {
                            text: 'Galeri', onPress: () => launchImageLibrary({ includeBase64: true, quality: 1 }, response => {
                                if (!response.didCancel) {
                                    setData({ ...data, foto_ktpagen: `data:${response.type};base64,${response.base64}` })
                                }
                            })
                        },
                        {
                            text: 'Kamera', onPress: () => launchCamera({ includeBase64: true, quality: 1 }, response => {
                                if (!response.didCancel) {
                                    setData({ ...data, foto_ktpagen: `data:${response.type};base64,${response.base64}` })
                                }
                            })
                        }
                    ])}>
                        <View style={{
                            borderWidth: 1,
                            padding: 0,
                            width: windowWidth - 32,
                            overflow: 'hidden',
                            borderRadius: 5,
                            borderColor: Color.blueGray[200]
                        }}>
                            <FastImage style={styles.ktpImage} source={{ uri: data.foto_ktpagen }} />
                        </View>

                    </TouchableWithoutFeedback>
                    <MyGap jarak={20} />
                    <MyInput label='Nama Bank' placeholder="Masukan nama bank" onChangeText={x => setData({ ...data, bank: x })} iconname='home' />
                    <MyGap jarak={20} />
                    <MyInput label='Nomor Rekening' placeholder="Masukan nomor rekening" keyboardType='phone-pad' onChangeText={x => setData({ ...data, rekening: x })} iconname='card' />
                    <MyGap jarak={20} />
                    <MyInput label='Kata Sandi' placeholder="Masukan kata sandi" secureTextEntry onChangeText={x => setData({ ...data, password: x })} iconname='lock-closed' />
                    <MyGap jarak={20} />
                    <MyInput label='Ulangi Kata Sandi' placeholder="Ulangi kata sandi" secureTextEntry onChangeText={x => setData({ ...data, repassword: x })} iconname='lock-closed' />
                    <MyGap jarak={20} />
                    {!loading ? <MyButton title='Daftar' Icons='log-in' onPress={simpan} /> : <ActivityIndicator size='large' color={colors.primary} />}
                    <MyGap jarak={30} />
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    scrollView: { flexGrow: 1, padding: 16 },
    logo: { alignSelf: 'center', width: windowWidth / 3, height: windowWidth / 3, resizeMode: 'contain', marginTop: 20 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
    subtitle: { textAlign: 'center', color: colors.primary, marginBottom: 10 },
    label: { fontWeight: 'bold', marginBottom: 10 },
    ktpImage: { width: windowWidth - 32, borderRadius: 5, height: 200, resizeMode: 'cover' }
});
