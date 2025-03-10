import { View, Text, FlatList, TouchableWithoutFeedback, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { MyCalendar, MyGap, MyHeader } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { Color, MyDimensi, colors, fonts } from '../../utils'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'

export default function Pembayaran({ navigation, route }) {
  const user = route.params;

  const MyBack = () => {
    navigation.goBack();
  }

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getDaftar();
    }
  }, [isFocus]);

  const __getDaftar = () => {
    axios.post(apiURL + 'daftar', {
      input_by: user.id_pengguna
    }).then(res => {
      console.log(res.data);
      let byr = 0
      res.data.map(i => {
        byr += i.bayar !== null ? parseFloat(i.bayar) : 0;
      });
      setTotal(byr);
      setData(res.data);
    })
  }
  var totalBayar = 0;
  return (
    <ImageBackground source={require('../../assets/bgone.png')} style={{ flex: 1, backgroundColor: "black" }}>
      {/* HEADERS */}

      {/* MAIN */}
      <ScrollView style={{ paddingHorizontal: 20, }}>

        <FlatList data={data} renderItem={({ item, index }) => {


          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('BayarDetail', item)}>
              <View style={{
                backgroundcolor: colors.white,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Color.blueGray[200],
                marginVertical: 10,
                overflow: 'hidden',
                padding: 0,
              }}>
                <View style={{
                  backgroundColor: 'white',
                  padding: 10,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Nomor KTP</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.nomor_ktp}</Text>
                </View>
                <View style={{
                  backgroundColor: 'white',
                  padding: 10,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Nama Jamaah</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.nama_jamaah}</Text>
                </View>
                <View style={{
                  padding: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Telepon Jamaah</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{item.telepon_jamaah}</Text>
                </View>
                <View style={{
                  padding: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Keberangkatan</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                  }}>{moment(item.tanggal_keberangkatan).format('DD MMMM YYYY')}</Text>
                </View>
                <View style={{
                  padding: 10,
                  backgroundColor: 'white',
                  // marginVertical: 5,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: MyDimensi / 4
                  }}>{item.paket}</Text>
                </View>

                <View style={{
                  backgroundColor: 'white',
                  padding: 10,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Total Biaya</Text>
                  <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.total)}</Text>
                </View>
                <View style={{
                  padding: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>Sudah Bayar</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format(item.bayar)}</Text>
                </View>
                <View style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  padding: 10,
                  paddingVertical: 5,
                }}>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    fontSize: MyDimensi / 4
                  }}>{(item.total - item.bayar) > 0 ? 'Kurang Bayar' : 'Lebih Bayar'}</Text>
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[800],
                    textAlign: 'right',
                    fontSize: MyDimensi / 3
                  }}>{new Intl.NumberFormat().format((item.total - item.bayar) > 0 ? (item.total - item.bayar) : Math.abs(item.total - item.bayar))}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
        <MyGap jarak={20} />
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        padding: 10,
      }}>
        <Text style={{
          flex: 1,
          fontFamily: fonts.secondary[600],
          fontSize: MyDimensi / 4,
          color: colors.black,
        }}>Total Pembayaran</Text>
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: MyDimensi / 3,
          color: colors.black,
        }}>{new Intl.NumberFormat().format(total)}</Text>
      </View>
    </ImageBackground >
  )
}