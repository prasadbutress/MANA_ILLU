import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import { ArrowLeft, MapPin, ChevronDown } from 'lucide-react-native';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

const buyTypes = ['All', 'Flat', 'Villa', 'Plot', 'Row House'];
const rentTypes = ['All', 'Flat', 'Villa', 'PG/Co-living', 'Commercial'];
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const statusOptions = ['All', 'Ready to Move', 'Under Construction'];
const budgetSteps = ['Any', '₹20 L', '₹50 L', '₹75 L', '₹1 Cr', '₹2 Cr', '₹5 Cr+'];

export const SearchFilterModal = ({ visible, onClose, onApply }) => {
  const [tab, setTab] = useState('Buy');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [budgetIndex, setBudgetIndex] = useState(0);

  function toggleBhk(bhk) {
    if (selectedBhk.includes(bhk)) {
      setSelectedBhk(selectedBhk.filter((b) => b !== bhk));
    } else {
      setSelectedBhk([...selectedBhk, bhk]);
    }
  }

  function handleReset() {
    setSelectedType('All');
    setSelectedBhk([]);
    setSelectedStatus('All');
    setBudgetIndex(0);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <ArrowLeft size={16} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Property</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabToggleRow}>
          {['Buy', 'Rent', 'Commercial'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.toggleTab,
                tab === t && styles.toggleTabActive,
              ]}
              onPress={() => setTab(t)}
            >
              <Text
                style={[
                  styles.toggleTabText,
                  tab === t && { color: NAVY, fontWeight: '700' },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scrollable Filters */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >
          {/* City */}
          <View style={styles.cityCard}>
            <MapPin size={14} color={PRIMARY} />
            <Text style={styles.cityText}>Hyderabad, Telangana</Text>
            <ChevronDown size={14} color="#9AA3B5" style={{ marginLeft: 'auto' }} />
          </View>

          {/* Property Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROPERTY TYPE</Text>
            <View style={styles.chipsRow}>
              {(tab === 'Buy' ? buyTypes : rentTypes).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.chip,
                    selectedType === t && styles.chipActive,
                  ]}
                  onPress={() => setSelectedType(t)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedType === t && { color: PRIMARY, fontWeight: '700' },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Budget Range Chips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BUDGET CAP</Text>
            <View style={styles.chipsRow}>
              {budgetSteps.map((b, idx) => (
                <TouchableOpacity
                  key={b}
                  style={[
                    styles.chip,
                    budgetIndex === idx && styles.chipActive,
                  ]}
                  onPress={() => setBudgetIndex(idx)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      budgetIndex === idx && { color: PRIMARY, fontWeight: '700' },
                    ]}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* BHK Configuration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BEDROOMS (BHK)</Text>
            <View style={styles.chipsRow}>
              {bhkOptions.map((bhk) => {
                const isSelected = selectedBhk.includes(bhk);
                return (
                  <TouchableOpacity
                    key={bhk}
                    style={[styles.chip, isSelected && styles.chipActive]}
                    onPress={() => toggleBhk(bhk)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && { color: PRIMARY, fontWeight: '700' },
                      ]}
                    >
                      {bhk}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Construction Status */}
          {tab === 'Buy' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONSTRUCTION STATUS</Text>
              <View style={styles.chipsRow}>
                {statusOptions.map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.chip,
                      selectedStatus === st && styles.chipActive,
                    ]}
                    onPress={() => setSelectedStatus(st)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedStatus === st && {
                          color: PRIMARY,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {st}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.bottomApplyBar}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              onApply({
                type: selectedType,
                status: tab,
              });
              onClose();
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    justifyContent: 'space-between',
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
    fontSize: 15,
    fontWeight: '700',
    color: NAVY,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    color: PRIMARY,
  },
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F8',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
    padding: 3,
  },
  toggleTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleTabActive: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  toggleTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A95A8',
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E2E6EF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  cityText: {
    fontSize: 13,
    fontWeight: '600',
    color: NAVY,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A95A8',
    letterSpacing: 1,
    marginBottom: 10,
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
  bottomApplyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F8',
  },
  applyButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
