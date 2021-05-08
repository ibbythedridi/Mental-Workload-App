import {
    StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff'
    },
    chart: {
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      shadowOpacity: 1.0,
      elevation: 5,
      marginBottom: 20
    },
    input: {
      height: 40,
      backgroundColor: '#eee',
      borderRadius: 7,
      marginBottom: 20,
      padding: 5,
      shadowColor: '#999',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      elevation: 3
    },
    button: {
      borderRadius: 7,
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#0043ff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 1,
      shadowOpacity: 1.0,
    },
    butText: {
      color: '#fff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 16,
      textAlign: 'center'
    },
    header: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headText: {
      color: '#444',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 1
    },
    card: {
      backgroundColor: '#f2f3f7',
      borderRadius: 7,
      shadowColor: '#222',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3,
      shadowOpacity: 0.2,
      elevation: 3,
      padding: 10,
      marginVertical: 10
    },
    subCard: {
      backgroundColor: '#e4e4e9',
      borderRadius: 7,
      shadowColor: '#222',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3,
      shadowOpacity: 0.2,
      elevation: 3,
      padding: 10,
      marginVertical: 10
    },
    cardHeading: {
      color: '#333',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 20,
      textAlign: 'center'
    },
    cardText: {
      color: '#555',
      padding: 10
    }
  });