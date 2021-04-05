import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { globalStyles } from '../styles/global';

export default function Header({ text }) {
    return (
        <View style={globalStyles.header}>
            <View>
                <Text style={globalStyles.headText}>{text}</Text>  
            </View>
            
        </View>
    )
}