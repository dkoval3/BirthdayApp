import { StatusBar } from 'expo-status-bar';
import React, { isValidElement, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const updateInfo = (val, updateFunc) => {
  updateFunc(val);
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

  const daysRemaining = () => {
    let month = 8
    let day = 15
    var eventdate = moment([2021, month, day]);
    var todaysdate = moment();
    console.log(eventdate.diff(todaysdate, 'days'))
    return eventdate.diff(todaysdate, 'days');
  };

  return (
    <View style={styles.container}>

      <View>
        <Text style={{ fontSize: 30 }}> Dane Koval</Text>
      </View>

      <View style={{ padding: 50 }}>
        <Text style={{ fontSize: 20 }}>It's Dane's birthday in 50 days!</Text>
      </View>

      <View style={styles.newInput}>
        <Text style={{ fontSize: 20 }}>Enter someone else's birthday below:</Text>
        <View style={styles.nameInput}>
          <TextInput style={{ fontSize: 20 }} placeholder="Name"
            onChangeText={(val) => updateInfo(val, setName)} />
          <View style={styles.dateInput}>

            <TextInput style={{ fontSize: 20 }} placeholder="MM"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setMonth)} />

            <TextInput style={{ fontSize: 20 }} placeholder="DD"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setDay)} />

            <TextInput style={{ fontSize: 20 }} placeholder="YYYY"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setYear)} />

          </View>
          <Button title="Add"
            onPress={daysRemaining} />
        </View>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
