import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MyDimensi, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';

export default function MyHeader({ onPress, judul }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.backButton}
      >
        <Icon type='ionicon' name='chevron-back-outline' size={MyDimensi / 2} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.title}>{judul}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.black,
    padding: 5,
    height: 60,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: MyDimensi / 4.5,
    color: colors.white,
    marginLeft: -70, // Supaya tidak terlalu dekat dengan tombol
  },
});
