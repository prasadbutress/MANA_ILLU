import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ManaIlluLogo } from '../components/ManaIlluLogo';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

export const AuthChoiceScreen = ({ onSignUp, onSignIn }) => {
  return (
    <LinearGradient
      colors={['#EDF8F0', '#EEF4FF', '#F3EFFF']}
      style={styles.container}
    >
      <View style={styles.centerCardContainer}>
        <ManaIlluLogo size={60} />
        <Text style={styles.badgeText}>No Broker · Direct Owners</Text>

        <View style={styles.glassCard}>
          <Text style={styles.cardTitle}>Welcome Back!</Text>
          <Text style={styles.cardSubtitle}>
            Find your dream home
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onSignUp}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerTerms}>
        By continuing you agree to our Terms & Privacy Policy
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerCardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: '#7A8499',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 36,
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 24,
    padding: 24,
    elevation: 6,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7A8499',
    textAlign: 'center',
    marginBottom: 26,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: PRIMARY,
    fontSize: 15,
    fontWeight: '700',
  },
  footerTerms: {
    fontSize: 11,
    color: '#A0AABF',
    textAlign: 'center',
  },
});
