import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Check, Camera } from 'lucide-react-native';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

const propTypes = ['Flat', 'Villa', 'Plot', 'Commercial'];
const bhkList = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

export const PostPropertyScreen = ({ onBack, onSubmitSuccess }) => {
  const [transactionType, setTransactionType] = useState('Sell');
  const [propertyType, setPropertyType] = useState('Flat');
  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('');
  const [price, setPrice] = useState('');
  const [bhk, setBhk] = useState('2 BHK');
  const [sqft, setSqft] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successCircle}>
          <Check size={36} color={PRIMARY} strokeWidth={3} />
        </View>
        <Text style={styles.successTitle}>Property Listed Successfully!</Text>
        <Text style={styles.successSub}>
          Your property has been listed with Direct Owner zero brokerage status. Buyers will contact you directly on your phone and WhatsApp.
        </Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            setSubmitted(false);
            onSubmitSuccess?.();
            onBack();
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={16} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Property (Free)</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
      >
        {/* Sell vs Rent */}
        <Text style={styles.label}>I WANT TO</Text>
        <View style={styles.toggleRow}>
          {['Sell', 'Rent'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.toggleBtn,
                transactionType === m && styles.toggleBtnActive,
              ]}
              onPress={() => setTransactionType(m)}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  transactionType === m && { color: NAVY, fontWeight: '700' },
                ]}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Property Type */}
        <Text style={styles.label}>PROPERTY TYPE</Text>
        <View style={styles.chipsRow}>
          {propTypes.map((pt) => (
            <TouchableOpacity
              key={pt}
              style={[
                styles.chip,
                propertyType === pt && styles.chipActive,
              ]}
              onPress={() => setPropertyType(pt)}
            >
              <Text
                style={[
                  styles.chipText,
                  propertyType === pt && { color: PRIMARY, fontWeight: '700' },
                ]}
              >
                {pt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Name */}
        <Text style={styles.label}>PROJECT / PROPERTY NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. My Home Bhooja Flat"
          placeholderTextColor="#A0AABF"
          value={title}
          onChangeText={setTitle}
        />

        {/* Locality */}
        <Text style={styles.label}>LOCALITY IN HYDERABAD</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. HITEC City / Gachibowli"
          placeholderTextColor="#A0AABF"
          value={locality}
          onChangeText={setLocality}
        />

        {/* BHK */}
        {propertyType !== 'Plot' && propertyType !== 'Commercial' && (
          <>
            <Text style={styles.label}>CONFIGURATION (BHK)</Text>
            <View style={styles.chipsRow}>
              {bhkList.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[styles.chip, bhk === b && styles.chipActive]}
                  onPress={() => setBhk(b)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      bhk === b && { color: PRIMARY, fontWeight: '700' },
                    ]}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Built-up area */}
        <Text style={styles.label}>BUILT-UP AREA (SQ.FT)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1850"
          placeholderTextColor="#A0AABF"
          keyboardType="numeric"
          value={sqft}
          onChangeText={setSqft}
        />

        {/* Price */}
        <Text style={styles.label}>
          EXPECTED {transactionType === 'Sell' ? 'PRICE (₹)' : 'MONTHLY RENT (₹)'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={transactionType === 'Sell' ? 'e.g. 85,00,000' : 'e.g. 35,000'}
          placeholderTextColor="#A0AABF"
          value={price}
          onChangeText={setPrice}
        />

        {/* Negotiable Checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setIsNegotiable(!isNegotiable)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.checkboxBox,
              isNegotiable && { backgroundColor: PRIMARY, borderColor: PRIMARY },
            ]}
          >
            {isNegotiable && <Check size={12} color="#fff" strokeWidth={3} />}
          </View>
          <Text style={styles.checkboxLabel}>Price is negotiable</Text>
        </TouchableOpacity>

        {/* Description */}
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
          placeholder="Describe amenities, landmarks, special features…"
          placeholderTextColor="#A0AABF"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Photo Box */}
        <Text style={styles.label}>PHOTOS</Text>
        <View style={styles.photoUploadBox}>
          <View style={styles.cameraCircle}>
            <Camera size={22} color={PRIMARY} />
          </View>
          <Text style={styles.uploadText}>Add Photos</Text>
          <Text style={styles.uploadSubtext}>Upload up to 10 photos directly</Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => setSubmitted(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit Property</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7A9A',
    letterSpacing: 0.8,
    marginTop: 14,
    marginBottom: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F8',
    borderRadius: 12,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 13,
    color: '#8A95A8',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E2E6EF',
  },
  chipActive: {
    backgroundColor: `${PRIMARY}18`,
    borderColor: PRIMARY,
  },
  chipText: {
    fontSize: 12,
    color: '#6B7A9A',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 46,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E2E6EF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 13,
    color: NAVY,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C8D0DF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  photoUploadBox: {
    borderWidth: 2,
    borderColor: '#D0D8E8',
    borderStyle: 'dashed',
    borderRadius: 14,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
    marginBottom: 20,
  },
  cameraCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${PRIMARY}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: NAVY,
  },
  uploadSubtext: {
    fontSize: 11,
    color: '#9AA3B5',
  },
  submitBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginBottom: 20,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${PRIMARY}18`,
    borderWidth: 2,
    borderColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 13,
    color: '#7A8499',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  doneButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
