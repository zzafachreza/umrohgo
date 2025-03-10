import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View, Text, FlatList, TouchableWithoutFeedback,
    StyleSheet, ImageBackground, ScrollView
} from 'react-native';
import { MyGap } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { Color, MyDimensi, colors, fonts } from '../../utils';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function TarikSaldoDetail({ navigation, route }) {
    const user = route.params;
    const isFocus = useIsFocused();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [cair, setCair] = useState(0);
    const [hold, setHold] = useState(0);

    const __getDaftar = useCallback(() => {
        axios.post(`${apiURL}tarik`, { fid_pengguna: user.id_pengguna })
            .then(res => {
                const daftar = res.data;
                let totalBayar = 0, holdSaldo = 0, cairSaldo = 0;

                daftar.forEach(i => {
                    const jumlah = i.jumlah ? parseFloat(i.jumlah) : 0;
                    totalBayar += jumlah;
                    if (i.status_tarik === 'Dalam Proses') holdSaldo += jumlah;
                    else cairSaldo += jumlah;
                });

                setData(daftar);
                setTotal(totalBayar);
                setCair(cairSaldo);
                setHold(holdSaldo);
            })
            .catch(err => console.error(err));
    }, [user.id_pengguna]);

    useEffect(() => {
        if (isFocus) __getDaftar();
    }, [isFocus, __getDaftar]);

    const renderItem = useCallback(({ item }) => (
        <TouchableWithoutFeedback>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Tanggal Tarik</Text>
                    <Text style={styles.value}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                </View>
                <View style={[styles.row, styles.borderBottom]}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={[styles.value, { color: getStatusColor(item.status_tarik) }]}>
                        {item.status_tarik}
                    </Text>
                </View>
                <View style={[styles.row, styles.borderBottom]}>
                    <Text style={styles.label}>Tanggal Transfer</Text>
                    <Text style={styles.value}>
                        {item.tanggal_transfer === '0000-00-00' ? '-' : moment(item.tanggal_transfer).format('DD MMMM YYYY')}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Total Tarik Dana</Text>
                    <Text style={styles.amount}>{formatCurrency(item.jumlah)}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ), []);

    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={styles.container}>
            <ScrollView style={styles.content}>
                <MyGap jarak={20} />
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <MyGap jarak={20} />
            </ScrollView>

            <View style={styles.summary}>
                <SummaryItem label="Total Tarik Saldo" value={total} />
                <SummaryItem label="Total Dalam Proses" value={hold} />
                <SummaryItem label="Total Sudah Ditransfer" value={cair} />
            </View>
        </ImageBackground>
    );
}

const SummaryItem = ({ label, value }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{formatCurrency(value)}</Text>
    </View>
);

const getStatusColor = (status) => {
    switch (status) {
        case 'Dalam Proses': return colors.warning;
        case 'Tolak Penarikan Fee': return colors.danger;
        default: return colors.success;
    }
};

const formatCurrency = (amount) => new Intl.NumberFormat().format(amount);

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
    card: {
        borderWidth: 1,
        borderColor: Color.blueGray[200],
        borderRadius: 10,
        marginVertical: 2,
        backgroundColor: colors.white,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    label: {
        flex: 1,
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 4,
        color: colors.black,
    },
    value: {
        flex: 1,
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4,
        textAlign: 'right',
    },
    amount: {
        flex: 1,
        textAlign: 'right',
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 3,
    },
    summary: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    summaryRow: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    summaryLabel: {
        flex: 1,
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4,
        color: colors.black,
    },
    summaryValue: {
        fontFamily: fonts.secondary[800],
        fontSize: MyDimensi / 3,
        color: colors.black,
    },
});
