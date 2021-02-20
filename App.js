import React from 'react';
import Navigator from './routes/homeStack';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function App() {

  // Effect hook creates ISA table
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS isa (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dateTime TEXT NOT NULL, ratingOne INTEGER NOT NULL, ratingTwo INTEGER NOT NULL, ratingThree INTEGER NOT NULL, summary TEXT)'
      );
      tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, timeInBed REAL NOT NULL, timeTilSleep INTEGER NOT NULL, timesWokenUp INTEGER NOT NULL, sleepQuality INTEGER NOT NULL');
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 4, -1, 1, ?)', ['20/07/2020-10:12:13', 'this is the summary 2']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 2, -1, 1, ?)', ['20/07/2020-11:12:13', 'this is the summary 3']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 1, -1, 1, ?)', ['20/07/2020-12:12:13', 'this is the summary 4']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-13:12:13', 'this is the summary 5']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-15:12:13', 'this is the summary 7']);
      // tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 5, -1, 1, ?)', ['20/07/2020-16:12:13', 'this is the summary 8']);
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
