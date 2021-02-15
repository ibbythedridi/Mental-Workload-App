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
      //tx.executeSql('INSERT INTO isa (dateTime, ratingOne, ratingTwo, ratingThree, summary) values (?, 4, -1, 1, ?)', ['20/07/2020-10:12:13', 'this is the summary 2']);
      tx.executeSql('SELECT * from isa', [], (_, { rows }) => 
        console.log(JSON.stringify(rows))
      );
      //console.log(new Date().format('DD/MM/YYYY-hh:mm:ss').toString());
    });
  }, []);

  return (
    // Renders stack navigator (home stack)
    <Navigator />
  );
}
