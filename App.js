import React, {useState} from 'react';
import Navigator from './routes/homeStack';
import DBHelper from './components/dbHelper';
import AppContext from './components/AppContext';

const dbHelper = new DBHelper();

export default function App() {

  const [debugMode, setDebugMode] = useState(false);

  const debugToggle = () => {
    setDebugMode(!debugMode);
  }

  const settings = {
    debugMode,
    setDebugMode,
    debugToggle,
  }

  // Database initialisation
  dbHelper.initDB();

  return (
    <AppContext.Provider value={settings}>
      {/* Renders stack navigator (home stack) */}
      <Navigator />
    </AppContext.Provider>
  );
}
