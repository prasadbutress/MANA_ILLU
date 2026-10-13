import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const ManaIlluLogo = ({ size = 36 }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/manaillu_logo.png')}
        style={{
          height: size,
          width: size * 3.2,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
