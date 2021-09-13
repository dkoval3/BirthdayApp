import { StatusBar } from 'expo-status-bar';
import React, { isValidElement, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
import moment from 'moment';

const config = {
  apiKey: "AIzaSyB49iq1Nnr1_KlnNg3quGHKUkuGHhAT4aw",
  authDomain: "birthdayappreact-52f65.firebaseapp.com",
  projectId: "birthdayappreact-52f65",
  storageBucket: "birthdayappreact-52f65.appspot.com",
  messagingSenderId: "15532505348",
  appId: "1:15532505348:web:4478849c828751ba9ff851",
  measurementId: "G-01B8J1WG9J"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const getData = () => {
  let returnVal
  firebase.database().ref('users').on('value', (snapshot) => {
    returnVal = snapshot.val()
  });
  return returnVal
}

const updateInfo = (val, updateFunc) => {
  updateFunc(val);
}
// for a date, 3 numbers represent year, month day
export default function App() {
  var [month, setMonth] = useState("")
  var [day, setDay] = useState("")
  var [year, setYear] = useState("")
  var [name, setName] = useState("")
  var [idx, setIdx] = useState(0)

  const daysRemaining = (monthParam, dayParam) => {
    let month = monthParam - 1
    let day =  dayParam
    var eventdate = moment([2021, month, day]);
    var todaysdate = moment();
    // console.log(`${month} ${day} ${eventdate} ${todaysdate}`)
    // console.log(eventdate.diff(todaysdate, 'days'))
    if (eventdate.diff(todaysdate, 'days') < 0) {
      eventdate = moment([2022, month, day]);
    }
    return eventdate.diff(todaysdate, 'days');
  };

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
    // console.log(objectData)
    return objectData
  };

  var birthdayData = getData()
  var namesList = Object.keys(birthdayData)
  var birthdayList = Object.values(birthdayData)

  var currName = namesList[idx]
  var currBirthday = birthdayList[idx]

  var splitDate = currBirthday.split("-")
  var currMonth = parseInt(splitDate[0])
  var currDay = parseInt(splitDate[1])
  var currYear = parseInt(splitDate[2])

  var timeRem = daysRemaining(currMonth, currDay)

  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>{currName}</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageStyle}>
          It's {currName}'s birthday in {timeRem} days!
        </Text>
      </View>

      <View style={styles.newInput}>
        <Text style={styles.inputMessage} > Enter someone else's birthday below:</Text>
        <View style={styles.nameInput}>
          <TextInput style={styles.textInput} placeholder="First Last"
            onChangeText={(val) => updateInfo(val, setName)} />
          <View style={styles.dateInput}>

            <TextInput style={styles.textInput} placeholder="MM"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setMonth)} />

            <TextInput style={styles.textInput} placeholder="DD"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setDay)} />

            <TextInput style={styles.textInput} placeholder="YYYY"
              keyboardType="number-pad"
              onChangeText={(val) => updateInfo(val, setYear)} />

          </View>
          <Button title="Add"
            onPress={getDataObject} />

          <Button 
          title="Next Friend"
          onPress={() => setIdx((idx + 1) % birthdayList.length)}/>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 80
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center"
  },
  messageContainer: {
    paddingBottom: 30
  },
  messageStyle: {
    fontSize: 25,
    textAlign: "center"
  },
  inputMessage: {
    paddingBottom: 10,
    fontSize: 20,
    textAlign: "center"
  },
  nameInput: {
    alignItems: "center"
  },
  textInput: {
    fontSize: 20
  }
});
