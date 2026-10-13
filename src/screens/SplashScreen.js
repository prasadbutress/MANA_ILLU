import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ManaIlluLogo } from '../components/ManaIlluLogo';

const PRIMARY = '#3DA84A';

export const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <LinearGradient
      colors={['#EDF8F0', '#EEF4FF', '#F3EFFF']}
      style={styles.container}
    >
      <View style={styles.centerBox}>
        <ManaIlluLogo size={68} />
        <Text style={styles.tagline}>
          Mee Illu · Mee Kosam · Hyderabad Lo
        </Text>

        {/* Loading Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2].map((idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                { backgroundColor: idx === 0 ? PRIMARY : '#C8D8E8' },
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBox: {
    alignItems: 'center',
  },
  tagline: {
    marginTop: 18,
    fontSize: 13,
    color: '#6B7A9A',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dotsRow: {
    marginTop: 40,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
