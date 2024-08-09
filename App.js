import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, StyleSheet } from "react-native"
import * as Location from "expo-location"
import MapView from 'react-native-maps';

const estilo = StyleSheet.create({
  tela: { flex: 1 },
  indicador: { backgroundColor: "#144272", padding: 32 },
  indicardorTexto: { color: "white", fontSize: 20 },
  mapa: { height: "100%", width: "100%" }
})

export default function App() {
  const [localizacao, definirLocalizacao] = useState({})

  useEffect(function () {
    async function ObterLocalizacao() {
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync(

      ))
    }
    ObterLocalizacao()
  }, [])

  return <View style={ estilo.tela }>
    <StatusBar barStyle="light-content" backgroundColor="#144272" />
    {Object.keys(localizacao).length > 0 &&
      <>
        <View style={ estilo.indicador }>
          <Text style={ estilo.indicardorTexto }> EXPLORAR NOVOS MAPAS </Text>
          <Text style={ estilo.indicardorTexto }> Latitude: {localizacao.coords.latitude} </Text>
          <Text style={ estilo.indicardorTexto }> Longitude: {localizacao.coords.longitude} </Text>
          <Text style={ estilo.indicardorTexto }> Altitude: {localizacao.coords.altitude} </Text>
        </View>
        <MapView
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={estilo.mapa} />
      </>
    }
  </View>
}
