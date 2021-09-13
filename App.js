import { StatusBar } from 'expo-status-bar';
import React, { isValidElement, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

const updateInfo = (val, updateFunc) => {
  updateFunc(val);
  console.log(typeof val);
}
// for a date, 3 numbers represent year, month day
export default function App() {
  var [month, setMonth] = useState("")
  var [day, setDay] = useState("")
  var [year, setYear] = useState("")
  var [name, setName] = useState("")

  const getDataObject = () => {
    let dayInt = parseInt(day, 10)
    let monthInt = parseInt(month - 1, 10)
    let yearInt = parseInt(year, 10)

    let objectData = {
      fullName: name,
      month: monthInt,
      day: dayInt,
      year: yearInt,
      date: new Date(yearInt, monthInt, dayInt)
    };
    console.log(objectData)
    return objectData
  };

  return (
    <View style={styles.container}>

      <View>
        <Text>Dane Koval</Text>
      </View>

      <View>
        <Text>It's Dane's birthday in 50 days!</Text>
      </View>

      <View style={styles.newInput}>
        <Text>Enter someone else's birthday below:</Text>
        <View style={styles.nameInput}>
          <TextInput placeholder="First Last"
          onChangeText={(val) => updateInfo(val, setName)} />
          <View style={styles.dateInput}>
            
            <TextInput placeholder="MM" 
            keyboardType="number-pad"
            onChangeText={(val) => updateInfo(val, setMonth)}/>

            <TextInput placeholder="DD"
            keyboardType="number-pad"
            onChangeText={(val) => updateInfo(val, setDay)} />
            
            <TextInput placeholder="YYYY"
            keyboardType="number-pad"
            onChangeText={(val) => updateInfo(val, setYear)} />

          </View>
          <Button title="Add"
          onPress={getDataObject} />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
