import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

//Picker select
import RNPickerSelect from 'react-native-picker-select';

class Report extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const handlerType = (value)=>{
            console.log("Type: " + value)
            this.props.updateType(value)
        }

        const handlerDescription = (value)=>{
            console.log("Text: " + value)
            this.props.updateDescription(value)
        }

        return (
            <View style={styles.report}>
                <Text style={styles.text}>Reporte tipo:</Text>
                <RNPickerSelect
                    style={customPickerStyles}
                    placeholder={{ label: "Seleccionar", value: null }}
                    items={[
                        { label: 'Hay basura', value: 'Hay basura' },
                        { label: 'Falta aseo', value: 'Falta aseo' },
                        { label: 'Robo', value: 'Robo' },
                        { label: 'Daño material', value: '' },
                        { label: 'Problemas pantalla/cañon', value: 'Problemas pantalla/cañon' },
                        { label: 'Faltan butacas', value: 'Faltan butacas' },
                        { label: 'Salon cerrado', value: 'Salon cerrado' },
                        { label: 'Accidente', value: 'Accidente' },
                        { label: 'Objeto perdido', value: 'Objeto perdido' },
                        { label: 'Otro', value: 'Otro' },
                    ]}
                    onValueChange={(value) => handlerType(value)}
                />
                <Text style={styles.text}>Comnetarios:</Text>
                <TextInput
                    style={styles.comments}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Describe el problema..."
                    onChangeText={value=>handlerDescription(value)}
                />
            </View>
        )
    };
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    },
    comments: {
        textAlignVertical: 'top',
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    report: {
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
        color: 'orange'
    },
})

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default Report