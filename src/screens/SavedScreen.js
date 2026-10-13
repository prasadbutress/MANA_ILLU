import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MapPin, Home } from 'lucide-react-native';
import propertiesData from '../data/properties.json';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

function formatPrice(price, status) {
  if (status === 'Rent') {
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }
  if (price >= 1e7) {
    return `₹${(price / 1e7).toFixed(2)} Cr`;
  }
  if (price >= 1e5) {
    return `₹${(price / 1e5).toFixed(1)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export const SavedScreen = ({ favorites, onSelect }) => {
  const savedProperties = propertiesData.filter((p) => favorites.has(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.headerSub}>
          {savedProperties.length} saved{' '}
          {savedProperties.length === 1 ? 'property' : 'properties'}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {savedProperties.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Home size={44} color="#C8D0DF" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No saved properties</Text>
            <Text style={styles.emptySub}>
              Tap the heart icon on any listing to save it here
            </Text>
          </View>
        ) : (
          savedProperties.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.card}
              onPress={() => onSelect(p)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: p.image }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.propertyTitle} numberOfLines={1}>
                  {p.title}
                </Text>
                <View style={styles.addressRow}>
                  <MapPin size={10} color={PRIMARY} />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {p.address}
                  </Text>
                </View>
                <Text style={styles.priceText}>
                  {formatPrice(p.price, p.status)}
                </Text>
                <Text style={styles.typeText}>
                  {p.type} · {p.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: NAVY,
  },
  headerSub: {
    fontSize: 12,
    color: '#9AA3B5',
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: NAVY,
  },
  emptySub: {
    fontSize: 12,
    color: '#9AA3B5',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF1F8',
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  propertyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: NAVY,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  addressText: {
    fontSize: 11,
    color: '#9AA3B5',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: PRIMARY,
    marginTop: 4,
  },
  typeText: {
    fontSize: 10,
    color: '#9AA3B5',
    marginTop: 2,
  },
});
