import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableWithoutFeedback, ImageBackground, StyleSheet
} from 'react-native';
import { MyHeader } from '../../components';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { Color, MyDimensi, colors, fonts, windowHeight } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import Modal from "react-native-modal";
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

export default function Royalti({ navigation, route }) {
  const user = route.params;
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocus = useIsFocused();

  const fetchRoyalti = useCallback(() => {
    getData('user').then(uu => {
      axios.post(`${apiURL}royalti`, { fid_pengguna: uu.id_pengguna })
        .then(res => {
          if (res.data.length > 0) {
            setData(res.data);
            const totalNominal = res.data.reduce((sum, item) => sum + parseFloat(item.nominal), 0);
            setTotal(totalNominal);
          } else {
            showMessage({ message: 'Data belum ada!' });
          }
        })
        .catch(err => console.error(err));
    });
  }, []);

  useEffect(() => {
    if (isFocus) fetchRoyalti();
  }, [isFocus, fetchRoyalti]);

  return (
    <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>
      <MyHeader onPress={() => navigation.goBack()} judul='Royalti Saya' />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => {
            setSelectedIndex(index);
            setModalVisible(true);
          }}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.agen} Mendaftarkan {item.jamaah}</Text>
              <View style={styles.rowBetween}>
                <Text style={styles.dateText}>{moment(item.tanggal).format('DD/MM/yyyy')}</Text>
                <Text style={styles.nominalText}>{new Intl.NumberFormat().format(item.nominal)}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Royalti</Text>
        <Text style={styles.totalValue}>{new Intl.NumberFormat().format(total)}</Text>
      </View>

      <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={isModalVisible} onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Informasi Royalti</Text>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Icon type='ionicon' name='close' color={colors.white} size={MyDimensi / 2} />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.modalBody}>
              {selectedIndex !== null && (
                <>
                  <Text style={styles.modalDate}>{moment(data[selectedIndex].tanggal).format('dddd, DD MMMM YYYY')}</Text>
                  <Text style={styles.modalDescription}>{data[selectedIndex].keterangan}</Text>
                  <Text style={styles.modalNominal}>{new Intl.NumberFormat().format(data[selectedIndex].nominal)}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.blueGray[200],
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  cardTitle: {
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi / 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  dateText: {
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 4,
  },
  nominalText: {
    color: colors.primary,
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 4,
  },
  totalContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi / 4,
    color: colors.white,
  },
  totalValue: {
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 3,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    height: windowHeight / 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 4,
    color: colors.white,
  },
  modalBody: {
    padding: 20,
  },
  modalDate: {
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 4,
    marginBottom: 10,
  },
  modalDescription: {
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi / 4,
    marginBottom: 10,
  },
  modalNominal: {
    color: colors.primary,
    fontFamily: fonts.secondary[800],
    fontSize: MyDimensi / 2,
  },
});