import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { fonts, windowWidth, colors, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import FastImage from 'react-native-fast-image'

export default function Login({ navigation }) {
  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [comp, setComp] = useState({ tlp: '' });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axios.post(`${apiURL}company`);
        if (res.data.data) {
          setComp(res.data.data);
        }
      } catch (error) {
        console.log('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  const masuk = async () => {
    if (!kirim.username || !kirim.password) {
      showMessage({
        message: 'Username dan Password tidak boleh kosong!',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiURL}login`, kirim);
      setLoading(false);
      console.log(res.data)

      if (res.data.status === 200) {
        storeData('user', res.data.data);
        navigation.replace('MainApp');

      } else {
        showMessage({
          message: res.data.message,
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Terjadi kesalahan saat login. Coba lagi nanti.',
        type: 'danger',
      });
      console.log('Login error:', error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/bgone.png')} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          nestedScrollEnabled
        >
          <FastImage source={require('../../assets/newlogo.png')} style={styles.logo} />

          <MyGap jarak={30} />

          <MyInput
            label="Username"
            onChangeText={(x) => setKirim({ ...kirim, username: x })}
            iconname="person-outline"
            placeholder="Masukan username"
          />

          <MyGap jarak={20} />

          <MyInput
            label="Password"
            onChangeText={(x) => setKirim({ ...kirim, password: x })}
            iconname="lock-closed-outline"
            placeholder="Masukan password"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => {
              const urlWA = `https://wa.me/${comp.tlp}?text=Hallo admin saya lupa password . . .`;
              Linking.openURL(urlWA);
            }}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Lupa password?</Text>
          </TouchableOpacity>

          <MyGap jarak={20} />


          <MyButton onPress={masuk} title="Login" Icons="log-in-outline" />

          <View style={{
            marginTop: 20,
            height: 10
          }}>
            {loading &&

              <ActivityIndicator size="large" color={colors.black} />
            }
          </View>


          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Belum memiliki Akun?{' '}
              <Text style={styles.registerLink}>Daftar disini</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: windowWidth / 1.9,
    height: windowWidth / 1.9,
    resizeMode: 'contain',
    marginTop: 20,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: fonts.secondary[600],
    color: colors.black,
    fontSize: MyDimensi / 4,
    marginTop: 10,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: MyDimensi / 4,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    color: colors.black,
  },
  registerLink: {
    fontFamily: fonts.primary[600],
    color: colors.primary,
  },
});
