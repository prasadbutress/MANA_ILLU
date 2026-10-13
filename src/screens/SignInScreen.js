import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { ManaIlluLogo } from '../components/ManaIlluLogo';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

export const SignInScreen = ({ onNext, onBack }) => {
  const [mobile, setMobile] = useState('');

  const isValid = mobile.length === 10;

  return (
    <LinearGradient
      colors={['#EDF8F0', '#EEF4FF']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={18} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign In</Text>
        </View>

        {/* Card */}
        <View style={styles.formContainer}>
          <View style={styles.card}>
            <ManaIlluLogo size={42} />

            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtext}>
              Enter your mobile number to continue
            </Text>

            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInputRow}>
              <View style={styles.prefixBox}>
                <Text style={styles.prefixText}>+91</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="98480 00000"
                placeholderTextColor="#A0AABF"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobile}
                onChangeText={(t) => setMobile(t.replace(/\D/g, ''))}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: isValid ? PRIMARY : '#D8DDE8' },
              ]}
              onPress={() => isValid && onNext(mobile)}
              disabled={!isValid}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: '#E0E5EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: NAVY,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 20,
    padding: 22,
    elevation: 4,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginTop: 14,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: '#7A8499',
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7A9A',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  prefixBox: {
    height: 48,
    paddingHorizontal: 14,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E0E5EF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefixText: {
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E0E5EF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: NAVY,
  },
  submitButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
