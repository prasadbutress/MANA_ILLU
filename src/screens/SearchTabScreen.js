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
import { Search, MapPin, ChevronRight } from 'lucide-react-native';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

const hyderabadLocalities = [
  'Gachibowli',
  'Kukatpally',
  'Kondapur',
  'Madhapur',
  'Manikonda',
  'Banjara Hills',
  'Jubilee Hills',
  'Kompally',
];

export const SearchTabScreen = ({ onSelectLocality }) => {
  const [query, setQuery] = useState('');

  const filtered = hyderabadLocalities.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.headerTitle}>Search Localities</Text>
        <View style={styles.searchBox}>
          <Search size={14} color="#9AA3B5" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search localities, projects…"
            placeholderTextColor="#9AA3B5"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text style={styles.subHeading}>POPULAR HYDERABAD LOCALITIES</Text>
        {filtered.map((loc) => (
          <TouchableOpacity
            key={loc}
            style={styles.localityItem}
            onPress={() => onSelectLocality?.(loc)}
            activeOpacity={0.7}
          >
            <View style={styles.pinCircle}>
              <MapPin size={16} color={PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.localityName}>{loc}</Text>
              <Text style={styles.cityText}>Hyderabad, Telangana</Text>
            </View>
            <ChevronRight size={14} color="#C8D0DF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  searchHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E2E6EF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: NAVY,
    marginLeft: 8,
  },
  subHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7A8499',
    letterSpacing: 1,
    marginBottom: 12,
  },
  localityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${PRIMARY}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  localityName: {
    fontSize: 14,
    fontWeight: '600',
    color: NAVY,
  },
  cityText: {
    fontSize: 11,
    color: '#9AA3B5',
    marginTop: 2,
  },
});
