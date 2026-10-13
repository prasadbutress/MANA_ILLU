import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import onboardingData from '../data/onboarding.json';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

export const OnboardingScreen = ({ onDone }) => {
  const [curr, setCurr] = useState(0);

  const slide = onboardingData[curr];

  return (
    <View style={styles.container}>
      {/* Top 56% Visual Image Viewport */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: slide.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Bottom Mask Gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.85)', '#ffffff']}
          style={styles.imageGradientMask}
        />

        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onDone}
          activeOpacity={0.8}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Feature Tag Pill */}
        <View style={[styles.tagPill, { backgroundColor: slide.accent }]}>
          <Text style={styles.tagText}>{slide.tag}</Text>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtext}>{slide.sub}</Text>
        </View>

        {/* Dots & Actions */}
        <View style={styles.bottomBar}>
          <View style={styles.dotsRow}>
            {onboardingData.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  {
                    width: idx === curr ? 28 : 8,
                    backgroundColor: idx === curr ? slide.accent : '#D8E0EC',
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonRow}>
            {curr > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurr(curr - 1)}
                activeOpacity={0.7}
              >
                <Text style={styles.backButtonText}>‹</Text>
              </TouchableOpacity>
            )}

            {curr < onboardingData.length - 1 ? (
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: slide.accent }]}
                onPress={() => setCurr(curr + 1)}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: PRIMARY }]}
                onPress={onDone}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Get Started →</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    height: '56%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradientMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  skipButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A6A8A',
  },
  tagPill: {
    position: 'absolute',
    bottom: 16,
    left: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: NAVY,
    lineHeight: 32,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 13,
    color: '#7A8499',
    lineHeight: 22,
  },
  bottomBar: {
    marginTop: 'auto',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0E5EF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: NAVY,
    marginTop: -2,
  },
  nextButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
