import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';


const Header = () => {
    return (
    <View style={styles.header}>
        <Image source={require('../assets/LogoAdog.png')} style={styles.logo} />
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#212A75',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 15,
    },
    logo: {
        width: 70,
        height: 70,
    },
});

export default Header;