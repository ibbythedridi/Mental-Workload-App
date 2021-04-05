import {
    StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
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
      borderWidth: 1,
      marginBottom: 10,
      padding: 5
    },
    button: {
      borderRadius: 7,
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#5863F8',
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
    }
  });