
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';

//React native elements
//https://reactnativeelements.com/docs/3.4.2/overview
import { Button } from 'react-native-elements';

//My components
import Map from './components/Map'
import Report from './components/report';
import SelectImage from './components/Image'

//My scripts
import { uploadData } from './scripts/sendToPHP';
import { encodeImage } from './scripts/encodeImage';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Map
      long: 0,
      lat: 0,
      //Report
      reportType: "",
      description: "",
      //Image
      url: "",
      //Debug*
      info: ""
    };
  }

  render() {

    const updateMapCoords = (newLong, newLat) => {
      //console.log("Long: " + newLong + ", Lat: " + newLat)
      this.setState({ long: newLong })
      this.setState({ lat: newLat })
    }

    const updateReportType = (newType) => {
      this.setState({ reportType: newType })
    }

    const updateReportDescription = (newDescription) => {
      this.setState({ description: newDescription })
    }

    const updateImageUrl = async (newUrl) => {
      let img = await encodeImage(newUrl)

      this.setState({url: img})
    }



    const updateInfo = () => {
      let s = "Long: " + this.state.long + ", Lat: " + this.state.lat + "; Type: " + this.state.reportType + ", Description: " + this.state.description //+ "; url: " + this.state.url
      let DATE = new Date()

      const data = {
        time: DATE.toLocaleTimeString(),  //hora
        date: DATE.toLocaleDateString(),  //fecha
        longitude: this.state.long,
        latitude: this.state.lat,
        repType: this.state.reportType,
        description: this.state.description,
        img: this.state.url
      }

      s += " --> " + DATE.toLocaleString()
      this.setState({ info: s })

      uploadData(data)
    }

    return (
      <ScrollView style={styles.main}>
        <Text style={styles.h1}> Denuncias CUCEI </Text>
        <Text style={styles.h2}>Servicios generales</Text>

        {/* Componentes */}
        <Map updateCoords={updateMapCoords} />
        <Report updateType={updateReportType} updateDescription={updateReportDescription} />
        <SelectImage updateUrl={updateImageUrl} />

        <View style={styles.btnContainer}>
          <Button
            style={styles.btnSend}
            title={"Enviar"}
            onPress={updateInfo}
          />
          <Text>Info: {this.state.info}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16
  },

  main: {
    paddingTop: 10,
  },
  btnContainer: {
    marginTop: 30,
    marginBottom: 50,
    paddingLeft: '30%',
    paddingRight: '30%',
  },
})
