import React from 'react';
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { globalStyles } from '../styles/global';

export default function DButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={globalStyles.button}>
                <Text style={globalStyles.butText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}