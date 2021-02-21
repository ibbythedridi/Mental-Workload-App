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
      tx.executeSql('CREATE TABLE IF NOT EXISTS isa (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dateTime TEXT NOT NULL, ratingOne INTEGER NOT NULL, ratingTwo INTEGER NOT NULL, ratingThree INTEGER NOT NULL, summary TEXT)'
      );
      // timeInBed, timeTilSleep in hours (consider changing to mins)
      tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, timeInBed REAL NOT NULL, timeTilSleep REAL NOT NULL, timesWokenUp INTEGER NOT NULL, sleepQuality INTEGER NOT NULL');
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 4, -1, 1, ?)', ['20/07/2020-10:12:13', 'this is the summary 2']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 2, -1, 1, ?)', ['20/07/2020-11:12:13', 'this is the summary 3']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 1, -1, 1, ?)', ['20/07/2020-12:12:13', 'this is the summary 4']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-13:12:13', 'this is the summary 5']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-15:12:13', 'this is the summary 7']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-16:12:13', 'this is the summary 8']);

      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0.5, 0, 3)', ['20/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', ['21/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8, 1, 1, 2)', ['22/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0, 0, 3)', ['23/07/2020']);
      // tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9.5, 0.5, 2, 5)', ['24/07/2020']);
      
      // tx.executeSql('SELECT * from isa', [], (_, { rows }) => 
      //   console.log(JSON.stringify(rows))
      // );
      //console.log(new Date().format('DD/MM/YYYY-hh:mm:ss').toString());
    });
  }, []);

  return (
    // Renders stack navigator (home stack)
    <Navigator />
  );
}
