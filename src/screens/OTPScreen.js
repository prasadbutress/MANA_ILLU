import React, { useState, useRef, useEffect } from 'react';
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
import { ArrowLeft, Smartphone } from 'lucide-react-native';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

export const OTPScreen = ({ mobile, onVerify, onBack, onResend }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  function handleChange(val, idx) {
    const char = val.slice(-1);
    const updated = [...digits];
    updated[idx] = char;
    setDigits(updated);

    if (char && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  }

  function handleKeyPress(e, idx) {
    if (e.nativeEvent.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  }

  const isComplete = digits.every((d) => d !== '');

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
          <Text style={styles.headerTitle}>Verify OTP</Text>
        </View>

        {/* Card */}
        <View style={styles.formContainer}>
          <View style={styles.card}>
            <View style={styles.badgeCircle}>
              <Smartphone size={26} color={PRIMARY} />
            </View>

            <Text style={styles.cardTitle}>Enter OTP</Text>
            <Text style={styles.cardSub}>
              6-digit OTP sent to <Text style={styles.boldText}>+91 {mobile}</Text>
            </Text>

            {/* 6 Digit Inputs */}
            <View style={styles.otpRow}>
              {digits.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  style={[
                    styles.otpBox,
                    digit && {
                      borderColor: PRIMARY,
                      backgroundColor: `${PRIMARY}12`,
                    },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(val) => handleChange(val, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                />
              ))}
            </View>

            {/* Timer */}
            <View style={styles.resendRow}>
              {countdown > 0 ? (
                <Text style={styles.timerText}>
                  Resend OTP in{' '}
                  <Text style={{ color: PRIMARY, fontWeight: '700' }}>
                    0:{String(countdown).padStart(2, '0')}
                  </Text>
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onResend?.();
                    setCountdown(30);
                    setDigits(['', '', '', '', '', '']);
                  }}
                >
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: isComplete ? PRIMARY : '#D8DDE8' },
              ]}
              onPress={() => isComplete && onVerify()}
              disabled={!isComplete}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>Verify & Continue</Text>
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
    padding: 24,
    elevation: 4,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    alignItems: 'center',
  },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${PRIMARY}18`,
    borderWidth: 2,
    borderColor: `${PRIMARY}30`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: '#7A8499',
    textAlign: 'center',
    marginBottom: 24,
  },
  boldText: {
    fontWeight: '700',
    color: NAVY,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpBox: {
    width: 44,
    height: 52,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDE8F0',
    backgroundColor: '#F7F8FA',
    color: NAVY,
  },
  resendRow: {
    marginVertical: 14,
  },
  timerText: {
    fontSize: 12,
    color: '#9AA3B5',
  },
  resendLink: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY,
    textDecorationLine: 'underline',
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
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
