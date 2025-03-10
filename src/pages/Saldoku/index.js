import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyGap } from '../../components';

export default function Saldoku({ navigation, route }) {
  const user = route.params;
  const isFocus = useIsFocused();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios.post(apiURL + 'daftar', { input_by: user.id_pengguna })
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
  }, [user.id_pengguna]);

  useEffect(() => {
    if (isFocus) {
      fetchData();
    }
  }, [isFocus, fetchData]);

  // Hitung total fee menggunakan useMemo agar tidak re-render setiap saat
  const totalFee = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.fee ? parseFloat(item.fee) : 0), 0);
  }, [data]);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Nomor KTP</Text>
          <Text style={styles.value}>{item.nomor_ktp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nama Jamaah</Text>
          <Text style={styles.value}>{item.nama_jamaah}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Keberangkatan</Text>
          <Text style={styles.value}>{moment(item.tanggal_keberangkatan).format('DD MMMM YYYY')}</Text>
        </View>
        <View style={[styles.row, styles.packageRow]}>
          <Text style={styles.packageText}>{item.paket}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Fee</Text>
          <Text style={styles.feeValue}>{new Intl.NumberFormat().format(item.fee)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <MyGap jarak={20} />
        </ScrollView>
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Fee</Text>
        <Text style={styles.totalValue}>{new Intl.NumberFormat().format(totalFee)}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginVertical: 10,
    overflow: 'hidden',
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    flex: 1,
    fontFamily: fonts.secondary[800],
    fontSize: 14,
  },
  value: {
    flex: 1,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
  },
  packageRow: {
    borderBottomWidth: 0,
  },
  packageText: {
    flex: 1,
    fontFamily: fonts.secondary[800],
    color: colors.primary,
    fontSize: 14,
  },
  feeValue: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fonts.secondary[800],
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    flex: 1,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: colors.black,
  },
  totalValue: {
    fontFamily: fonts.secondary[800],
    fontSize: 16,
    color: colors.black,
  },
});
