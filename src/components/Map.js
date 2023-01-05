import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, PermissionsAndroid } from 'react-native'

//MapBox
import MapboxGL from '@react-native-mapbox-gl/maps'
MapboxGL.setAccessToken('sk.eyJ1IjoiZG55NDMiLCJhIjoiY2wzOHo5a20zMDEwNDNkczZiaGFicjMwbSJ9.dc-Loy1mBdJ6FF9JuZsc1Q')

class Map extends Component{
    constructor(props){
      super(props)
    }

    async componentDidMount(){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "PERMISO LOCALIZACION",
            message:
              "PERIMISO LOCALIZACON " +
              "POSICION EN EL MAPA",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          onUserLocationUpdate()
        } else {
          console.log("Camera permission denied");
        }
      }
      catch {
        //console.log("Esta en catch")
      }
    }

    onUserLocationUpdate = (e) => {
      const { longitude, latitude } = e.coords;
      this.props.updateCoords(longitude, latitude)
    }

    render(){
      return (
        <View style={styles.main}>          
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={16}
            centerCoordinate={[20.66611, -103.35607]}
            //style={{ flex: 1 }}
            showUserLocation={true}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            //onUserLocationUpdate={this.onUserLocationUpdate}
          >
            <MapboxGL.UserLocation
              visible={true}
              //onUpdate={this.onLocationUpdate}
              onUpdate={this.onUserLocationUpdate}
            />
            <MapboxGL.Camera
              zoomLevel={16}
              centerCoordinate={[3.3362400, 6.5790100]}
              animationMode={'flyTo'}
              animationDuration={0}
              followUserLocation={true}
            >
            </MapboxGL.Camera>
          </MapboxGL.MapView>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    main:{
        width: '100%',
        height: 250,
        marginTop: 30,
        //backgroundColor: "brown",
    },
    map:{
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        resizeMode: 'stretch',
        //borderRadius: 30,
        borderWidth: 2,
        borderColor: "black",
    },
})

export default Map