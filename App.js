import React from 'react';
import Navigator from './routes/homeStack';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default function App() {

  // Effect hook creates ISA table
  React.useEffect(() => {
    db.transaction(tx => {
      // Maybe add a check constraint to some of the rows in both tables? to make sure ratings are between 1-5 inclusive
      // https://www.sqlitetutorial.net/sqlite-check-constraint/

      /*
      dateTime = date and time of entry
      workloadRating = workload rating
      summary = summary
      */
      tx.executeSql('CREATE TABLE IF NOT EXISTS isa (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dateTime TEXT NOT NULL, workloadRating INTEGER NOT NULL, summary TEXT)'
      );
      /*
      date = date of night slept
      timeTilSleep = time taken from getting into bed to being asleep (in hours)
      timesWokenUp = # of times woken up throughout the night
      sleepQuality = subjective sleep quality rating
      */
      tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, timeInBed REAL NOT NULL, timeTilSleep REAL NOT NULL, timesWokenUp INTEGER NOT NULL, sleepQuality INTEGER NOT NULL)'
      );
      /*
      name = name of program
      date = date of entry
      interval = which half hour time interval this entry resides in
      time = time spent on program (in seconds)
      category = category of program
      */
      tx.executeSql('CREATE TABLE IF NOT EXISTS screenTime (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, date TEXT NOT NULL, interval TEXT NOT NULL, time INTEGER NOT NULL, category TEXT NOT NULL)'
      );
      
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', ['20/07/2020-17:12:13', 'this is the summary 9']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['20/07/2020-18:12:13', 'this is the summary 10']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['20/07/2020-19:12:13', 'this is the summary 11']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['20/07/2020-20:12:13', 'this is the summary 12']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', ['20/07/2020-21:12:13', 'this is the summary 13']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', ['20/07/2020-22:12:13', 'this is the summary 14']);

      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0.5, 0, 3)', ['20/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', ['21/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8, 1, 1, 2)', ['22/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0, 0, 3)', ['23/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9.5, 0.5, 2, 5)', ['24/07/2020']);

      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 100, ?)', ['Microsoft Word', '10/03/2021', '10:30:00-11:00:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 25, ?)', ['Adobe Reader', '10/03/2021', '10:30:00-11:00:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 225, ?)', ['Microsoft Outlook', '10/03/2021', '10:30:00-11:00:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['wordpress.com', '10/03/2021', '10:30:00-11:00:00', 'neutral']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 111, ?)', ['Photos', '10/03/2021', '10:30:00-11:00:00', 'neutral']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['youtube.com', '10/03/2021', '10:30:00-11:00:00', 'unproductive']);
      
      // tx.executeSql('SELECT * from isa', [], (_, { rows }) => 
      //   console.log(JSON.stringify(rows))
      // );

      // tx.executeSql('SELECT * from sleep', [], (_, { rows }) => 
      //   console.log(JSON.stringify(rows))
      // );

      // tx.executeSql('SELECT * from screenTime', [], (_, { rows }) => 
      //   console.log(JSON.stringify(rows))
      // );
    });
  }, []);

  return (
    // Renders stack navigator (home stack)
    <Navigator />
  );
}
