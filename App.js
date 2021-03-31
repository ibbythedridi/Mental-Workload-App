import React from 'react';
import Navigator from './routes/homeStack';
import DBHelper from './DBHelper';
import FlashMessage from 'react-native-flash-message';
import { View } from 'react-native';

const dbHelper = new DBHelper();

export default function App() {

  // Database initialisation
  dbHelper.initDB();

  return (
      // Renders stack navigator (home stack)
      <Navigator />
  );
}
