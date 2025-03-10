import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyHeader } from '../../components';
import { apiURL, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';

export default function TentangKami({ navigation, route }) {
    const item = route.params;
    const systemFonts = [fonts.secondary[600], fonts.secondary[800]];
    const [comp, setComp] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data);
            setComp(res.data.data);
        })
    }, [])


    return (
        <ImageBackground source={require('../../assets/bgone.png')} style={{ flex: 1, padding: 10 }}>
            {/* HEADERS */}
            {/* DESKRIPSI */}
            <View style={{
                flex: 1
            }}>
                <RenderHTML

                    tagsStyles={{
                        p: {
                            fontFamily: fonts.secondary[600],
                            textAlign: 'justify',
                            lineHeight: 20,
                        }, div: {
                            fontFamily: fonts.secondary[600],
                            textAlign: 'justify',
                            lineHeight: 20,
                        },
                    }}
                    systemFonts={systemFonts}
                    contentWidth={windowWidth}
                    source={{
                        html: comp.tentang
                    }}
                />
            </View>

            <MyButton onPress={() => Linking.openURL('https://wa.me/' + comp.tlp)} title="Hubungi Kami" Icons="logo-whatsapp" />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})