import React from 'react';
import Navigator from './routes/homeStack';
import DBHelper from './DBHelper';

const dbHelper = new DBHelper();

export default function App() {

  // Database initialisation
  dbHelper.initDB();

  return (
      // Renders stack navigator (home stack)
      <Navigator />
  );
}
