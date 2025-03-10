import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  ArtikelDetail,
  Video,
  VideoDetail,
  PaketUmrah,
  Pendaftaran,
  UpdateSeat,
  Pembayaran,
  Saldoku,
  DataJamaah,
  DataJamaah2,
  Royalti,
  PaketDetail,
  PaketDaftar,
  BayarDetail,
  BayarAdd,
  JamaahDetail,
  JamaahAgen,
  TarikSaldo,
  TarikSaldoDetail,
  JamaahEdit,
  SeatUpdate,
  TentangKami,
} from '../pages';
import { colors, fonts, MyDimensi } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Royalti" component={Royalti} />
      <Tab.Screen name="TarikSaldo" component={TarikSaldo} /> */}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {

  const headerStyleKu = (title) => {
    return {
      headerShown: true,
      headerTitle: title,

      headerStyle: {
        backgroundColor: colors.black,
        height: 70,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0

      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4
      }
    }
  }

  return (
    <Stack.Navigator initialRouteName=''>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaketDetail"
        component={PaketDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TarikSaldo"
        component={TarikSaldo}
        options={headerStyleKu('Tarik Saldo')}
      />
      <Stack.Screen
        name="TentangKami"
        component={TentangKami}
        options={headerStyleKu('Tentang Kami')}
      />

      <Stack.Screen
        name="TarikSaldoDetail"
        component={TarikSaldoDetail}
        options={headerStyleKu('Riwayat Tarik Saldo')}
      />

      <Stack.Screen
        name="PaketDaftar"
        component={PaketDaftar}

        options={headerStyleKu('Daftarkan Jamaah')}
      />

      <Stack.Screen
        name="BayarDetail"
        component={BayarDetail}
        options={headerStyleKu('Detail Pembayaran')}
      />


      <Stack.Screen
        name="BayarAdd"
        component={BayarAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JamaahDetail"
        component={JamaahDetail}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="JamaahAgen"
        component={JamaahAgen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JamaahEdit"
        component={JamaahEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="PaketUmroh"
        component={PaketUmrah}
        options={headerStyleKu('Paket Umroh')}
      />



      <Stack.Screen
        name="Pendaftaran"
        component={Pendaftaran}
        options={headerStyleKu('Pendaftaran')}
      />


      <Stack.Screen
        name="SeatUpdate"
        component={SeatUpdate}
        options={headerStyleKu('Update Seat')}
      />

      <Stack.Screen
        name="Pembayaran"
        component={Pembayaran}
        options={headerStyleKu('Pembayaran')}
      />

      <Stack.Screen
        name="Saldoku"
        component={Saldoku}
        options={headerStyleKu('Saldoku')}
      />



      <Stack.Screen
        name="Datajamaah"
        component={DataJamaah}
        options={headerStyleKu('Data Jamaah')}
      />

      <Stack.Screen
        name="DataJamaahDetail"
        component={DataJamaah2}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Royalti"
        component={Royalti}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ArtikelDetail"
        component={ArtikelDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Video"
        component={Video}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}
