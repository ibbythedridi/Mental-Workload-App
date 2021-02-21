import {
    StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    chart: {
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      shadowOpacity: 1.0,
      elevation: 5,
      marginBottom: 20
    }
  });