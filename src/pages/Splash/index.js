import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Gunakan transform scale
  const textOpacity = useRef(new Animated.Value(0)).current; // Gunakan opacity untuk teks

  useEffect(() => {
    // Animasi logo (memperbesar)
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: 800,
        useNativeDriver: true, // ✅ Aman digunakan
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // ✅ Aman digunakan
      }),
    ]).start();

    // Navigasi setelah animasi selesai
    const timeout = setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login');
        } else {
          navigation.replace('MainApp');
        }
      });
    }, 1500);

    return () => clearTimeout(timeout); // Mencegah navigasi error saat unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.background}>
          <Animated.Image
            source={require('../../assets/newlogo.png')}
            resizeMode="contain"
            style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Gunakan transform scale
          />

          <ActivityIndicator color={colors.secondary} size="large" />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 3, // Awalnya kecil, lalu diperbesar dengan animasi scale
    height: windowWidth / 3,
    marginBottom: 50,
  },
  text: {
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});
