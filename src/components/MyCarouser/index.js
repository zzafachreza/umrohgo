import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const windowWidth = useMemo(() => Dimensions.get('window').width, []);
  const itemWidth = 300;

  useEffect(() => {
    axios.get(apiURL + 'artikel')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching carousel data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderCarouselItem = useCallback(({ item }) => (
    <TouchableWithoutFeedback>
      <View style={styles.cardContainer}>
        <FastImage source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.overlay}>
          <Image source={require('../../assets/nikmatour.png')} style={styles.logo} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ), []);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />;
  }

  return (
    <View style={styles.carouselContainer}>
      {data.length > 0 ? (
        <Carousel
          loop
          data={data}
          renderItem={renderCarouselItem}
          sliderWidth={windowWidth}
          itemWidth={itemWidth}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.primary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
  },
  cardContainer: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  cardImage: {
    height: 180,
    width: 300,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

