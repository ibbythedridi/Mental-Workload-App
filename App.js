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
      
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 4, ?)', ['20/07/2020-10:12:13', 'this is the summary 2']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', ['20/07/2020-11:12:13', 'this is the summary 3']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['20/07/2020-12:12:13', 'this is the summary 4']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 5, ?)', ['20/07/2020-13:12:13', 'this is the summary 5']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 5, ?)', ['20/07/2020-15:12:13', 'this is the summary 7']);
      // tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 5, ?)', ['20/07/2020-16:12:13', 'this is the summary 8']);

      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0.5, 0, 3)', ['20/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', ['21/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8, 1, 1, 2)', ['22/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0, 0, 3)', ['23/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9.5, 0.5, 2, 5)', ['24/07/2020']);

      //tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 165, ?)', ['Microsoft Word', '10/03/2021', '10:00:00-10:30:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 65, ?)', ['Adobe Reader', '10/03/2021', '10:00:00-10:30:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 95, ?)', ['Microsoft Outlook', '10/03/2021', '10:00:00-10:30:00', 'productive']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 60, ?)', ['wordpress.com', '10/03/2021', '10:00:00-10:30:00', 'neutral']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 5, ?)', ['Photos', '10/03/2021', '10:00:00-10:30:00', 'neutral']);
      // tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 205, ?)', ['youtube.com', '10/03/2021', '10:00:00-10:30:00', 'unproductive']);
      
      tx.executeSql('SELECT * from isa', [], (_, { rows }) => 
        console.log(JSON.stringify(rows))
      );

      tx.executeSql('SELECT * from sleep', [], (_, { rows }) => 
        console.log(JSON.stringify(rows))
      );

      tx.executeSql('SELECT * from screenTime', [], (_, { rows }) => 
        console.log(JSON.stringify(rows))
      );
    });
  }, []);

  return (
    // Renders stack navigator (home stack)
    <Navigator />
  );
}
