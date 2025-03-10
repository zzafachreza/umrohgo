import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { Color, MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';
import FastImage from 'react-native-fast-image'

const MyButtonKu = ({ onPress, img, label }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.kotak}>
        <FastImage source={img} style={{
          height: 60,
          width: 80,
        }} resizeMode={FastImage.resizeMode.contain} />
        <Text style={{
          color: colors.primary,
          textAlign: "center",
          fontSize: MyDimensi / 5,
          fontFamily: fonts.primary[600],
          marginTop: 10,

        }}>
          {label}
        </Text>
      </View>

    </TouchableNativeFeedback>
  )
}

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([{ "halaman": "AsupanMpasi", "id": "1", "image": "https://simonev.okeadmin.com/datafoto/a0003ce4349b2c7d4eff29b6d51a37075a774c47.png", "judul": "Asupan  MPASI", "warna": "#FE9A3B33" }, { "halaman": "AsupanAsi", "id": "2", "image": "https://simonev.okeadmin.com/datafoto/4f8b42e79f74f6c6d5a45865b9d5d9ca20a2a33e.png", "judul": "Asupan ASI", "warna": "#FF96A533" }, { "halaman": "StatusGizi", "id": "3", "image": "https://simonev.okeadmin.com/datafoto/43f86c8c8d15892eb4fbbd6466051168022d3918.png", "judul": "Status Gizi", "warna": "#FFA72633" }, { "halaman": "TanyaJawab", "id": "4", "image": "https://simonev.okeadmin.com/datafoto/abf1442b27cc406e0320e251e6ac57ba62d2128a.png", "judul": "Tanya Jawab", "warna": "#FFE29433" }, { "halaman": "Artikel", "id": "5", "image": "https://simonev.okeadmin.com/datafoto/655b4e3a81f3c760a001b1199ccb38aa6c1e63c4.png", "judul": "Artikel", "warna": "#CCE0F133" }, { "halaman": "Video", "id": "6", "image": "https://simonev.okeadmin.com/datafoto/9c25ee17076411e53acbefd97c3a40240642013a.png", "judul": "Video", "warna": "#C92B7433" }, { "halaman": "Resep", "id": "7", "image": "https://simonev.okeadmin.com/datafoto/30eea7e269ad623a515074c7b6ef65680b2bed84.png", "judul": "Resep MPASI", "warna": "#FFCDBC33" }, { "halaman": "Faq", "id": "8", "image": "https://simonev.okeadmin.com/datafoto/87a8a923f8334cde6a8fab507ea83964a76248d1.png", "judul": "FAQ", "warna": "#9CC44533" }, { "halaman": "GameKuis", "id": "9", "image": "https://simonev.okeadmin.com/datafoto/98b60a5ebe438acf92a114070e89ed0a52d11754.png", "judul": "Game Kuis", "warna": "#56D8D833" }]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {


    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);




  return (

    <ImageBackground source={require('../../assets/bgtwo.png')} style={{
      flex: 1,
      width: "100%",
      height: "100%",

      backgroundColor: colors.white,



    }}>

      {/* HEADERS */}
      <View style={{

        backgroundColor: "black",
        padding: 20,
        height: windowHeight / 4,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center'


      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{ fontFamily: fonts.secondary[800], color: colors.white }}>Selamat Datang,</Text>
            <Text style={{ fontFamily: fonts.secondary[400], color: colors.white }}>
              {user.nama_lengkap}
            </Text>
          </View>


          <View style={{
            backgroundColor: colors.white,
            borderRadius: 25,
          }}>
            <Image source={require('../../assets/logo.png')} style={{
              width: 50,
              height: 50,
              resizeMode: 'contain'
            }} />
          </View>
        </View>

      </View>
      {/* MAIN CONTRNT */}


      <View style={{
        marginTop: -100
      }}>
        <MyCarouser />
      </View>

      <View style={{
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
      }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around", }}>

          {/* 1 */}

          <MyButtonKu label="Paket Umroh" img={require('../../assets/pakethajiumroh.png')} onPress={() => navigation.navigate('PaketUmroh', user)} />
          <MyButtonKu label="Pendaftaran" img={require('../../assets/pendaftaran.png')} onPress={() => navigation.navigate('Pendaftaran', user)} />
          <MyButtonKu label="Update Seat" img={require('../../assets/updateseat.png')} onPress={() => navigation.navigate('SeatUpdate', user)} />

        </View>

        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-around", }}>
          {/* 1 */}
          <MyButtonKu label="Saldoku" img={require('../../assets/saldoku.png')} onPress={() => navigation.navigate('Saldoku', user)} />
          <MyButtonKu label="Data Jamaah" img={require('../../assets/datajamaah.png')} onPress={() => navigation.navigate('Datajamaah', user)} />
          <MyButtonKu label="Payment" img={require('../../assets/payment.png')} onPress={() => navigation.navigate('Pembayaran', user)} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-around", }}>
          {/* 2 */}
          <MyButtonKu label="Royalti" img={require('../../assets/royalti.png')} onPress={() => navigation.navigate('Royalti', user)} />
          <MyButtonKu label="Tarik Saldo" img={require('../../assets/tariksaldo.png')} onPress={() => navigation.navigate('TarikSaldo', user)} />
          <MyButtonKu label="Tentang Kami" img={require('../../assets/logo.png')} onPress={() => navigation.navigate('TentangKami', user)} />
        </View>


      </View>













    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  kotak: {
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: Color.blueGray[200],
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    height: windowHeight / 7,
  },
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})