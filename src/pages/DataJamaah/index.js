import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { MyHeader } from '../../components';
import { apiURL } from '../../utils/localStorage';
import { Color, MyDimensi, colors, fonts } from '../../utils';

export default function DataJamaah({ navigation, route }) {
  const user = route.params;
  const [jamaah, setJamaah] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchJamaah();
    }
  }, [isFocused]);

  const fetchJamaah = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(apiURL + 'jamaah', {
        input_by: user.id_pengguna,
        level: user.level,
      });
      setJamaah(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const renderItem = useCallback(({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('JamaahDetail', item)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.label}>Nomor KTP</Text>
          <Text style={styles.value}>{item.nomor_ktp}</Text>
          <Text style={styles.label}>Nama Jamaah</Text>
          <Text style={styles.value}>{item.nama_jamaah}</Text>
          <Text style={styles.label}>Nomor Telepon</Text>
          <Text style={styles.value}>{item.telepon_jamaah}</Text>
        </View>
        <Icon type='ionicon' name='chevron-forward-circle-outline' size={MyDimensi / 2} color={colors.primary} />
      </View>
    </TouchableWithoutFeedback>
  ), [navigation]);

  return (
    <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.black} size='large' />
        </View>
      ) : (
        <FlatList
          data={jamaah}
          renderItem={renderItem}
          keyExtractor={(item) => item.nomor_ktp}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  itemContainer: {
    borderWidth: 1,
    borderColor: Color.blueGray[200],
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: { flex: 1 },
  label: {
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 4,
  },
  value: {
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi / 4,
  },
});