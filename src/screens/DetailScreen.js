import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  ShieldCheck,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Check,
  Phone,
  MessageCircle,
} from 'lucide-react-native';

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

export const DetailScreen = ({
  property,
  onBack,
  favorites,
  onToggleFavorite,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!property) return null;

  function handleCall() {
    const rawNumber = property.agent.calls.replace(/\s+/g, '');
    Linking.openURL(`tel:${rawNumber}`);
  }

  function handleWhatsApp() {
    const rawNumber = property.agent.calls.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hi ${property.agent.name}, I am interested in your property ${property.title} listed on Mana Illu.`
    );
    Linking.openURL(`https://wa.me/${rawNumber}?text=${message}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Detail Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Photo Gallery Header */}
        <View style={styles.galleryContainer}>
          <Image
            source={{ uri: property.images[photoIndex] || property.image }}
            style={styles.galleryImage}
            resizeMode="cover"
          />

          {/* Top Floating Actions */}
          <View style={styles.topActionsRow}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <ArrowLeft size={18} color="#fff" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => onToggleFavorite(property.id)}
                activeOpacity={0.8}
              >
                <Heart
                  size={18}
                  fill={favorites.has(property.id) ? '#EF4444' : 'none'}
                  color={favorites.has(property.id) ? '#EF4444' : '#ffffff'}
                  strokeWidth={favorites.has(property.id) ? 2.5 : 2}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Photo Dots */}
          <View style={styles.photoDotsRow}>
            {property.images.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setPhotoIndex(idx)}
                style={[
                  styles.photoDot,
                  photoIndex === idx && styles.photoDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content Container */}
        <View style={styles.bodyContent}>
          {/* Header Info */}
          <View style={styles.headerInfoRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.typeTagRow}>
                <Text style={styles.typeTag}>{property.type.toUpperCase()}</Text>
                <Text style={{ color: '#C8D0DF' }}>•</Text>
                <Text style={styles.statusTag}>{property.status.toUpperCase()}</Text>
              </View>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <View style={styles.addressRow}>
                <MapPin size={12} color={PRIMARY} />
                <Text style={styles.addressText}>
                  {property.address}, {property.city}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.priceText}>
                {formatPrice(property.price, property.status)}
              </Text>
              {property.status === 'Buy' && (
                <Text style={styles.sqftText}>
                  ₹{Math.round(property.price / property.sqft).toLocaleString('en-IN')}/sqft
                </Text>
              )}
            </View>
          </View>

          {/* Rating & Trust Badge */}
          <View style={styles.ratingTrustRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  fill={s <= Math.round(property.rating) ? '#F5A623' : 'none'}
                  color={s <= Math.round(property.rating) ? '#F5A623' : '#D0D8E8'}
                />
              ))}
              <Text style={styles.ratingNumber}>{property.rating}</Text>
              <Text style={styles.reviewsCount}>({property.reviews} reviews)</Text>
            </View>

            <View style={styles.noBrokerBadge}>
              <ShieldCheck size={10} color={PRIMARY} />
              <Text style={styles.noBrokerText}>NO BROKER</Text>
            </View>
          </View>

          {/* 4-Column Key Metrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Bed size={15} color={PRIMARY} />
              <Text style={styles.metricValue}>
                {property.type === 'Plot' ? 'N/A' : property.beds}
              </Text>
              <Text style={styles.metricLabel}>BEDS</Text>
            </View>

            <View style={styles.metricCard}>
              <Bath size={15} color={PRIMARY} />
              <Text style={styles.metricValue}>
                {property.type === 'Plot' ? 'N/A' : property.baths}
              </Text>
              <Text style={styles.metricLabel}>BATHS</Text>
            </View>

            <View style={styles.metricCard}>
              <Square size={15} color={PRIMARY} />
              <Text style={styles.metricValue}>
                {property.sqft.toLocaleString()}
              </Text>
              <Text style={styles.metricLabel}>
                {property.type === 'Plot' ? 'SQ YD' : 'SQFT'}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <TrendingUp size={15} color={PRIMARY} />
              <Text style={styles.metricValue}>{property.yearBuilt}</Text>
              <Text style={styles.metricLabel}>BUILT</Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>ABOUT</Text>
            <Text style={styles.descriptionText}>{property.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>FEATURES</Text>
            <View style={styles.featuresGrid}>
              {property.features.map((feat) => (
                <View key={feat} style={styles.featureItem}>
                  <View style={styles.checkCircle}>
                    <Check size={10} color={PRIMARY} strokeWidth={3} />
                  </View>
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Direct Owner Profile Card */}
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>{property.agent.avatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerName}>{property.agent.name}</Text>
              <Text style={styles.ownerRole}>{property.agent.title}</Text>
              <Text style={styles.ownerPhone}>{property.agent.calls}</Text>
            </View>
            <View style={styles.noBrokerBadge}>
              <ShieldCheck size={10} color={PRIMARY} />
              <Text style={styles.noBrokerText}>VERIFIED</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Contact Bar */}
      <View style={styles.floatingBottomBar}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall}
          activeOpacity={0.85}
        >
          <Phone size={16} color="#fff" />
          <Text style={styles.callButtonText}>Call Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={handleWhatsApp}
          activeOpacity={0.85}
        >
          <MessageCircle size={16} color={NAVY} />
          <Text style={styles.whatsappButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  galleryContainer: {
    height: 240,
    position: 'relative',
    backgroundColor: '#333',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  topActionsRow: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 36 : 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDotsRow: {
    position: 'absolute',
    bottom: 14,
    left: '50%',
    marginLeft: -20,
    flexDirection: 'row',
    gap: 6,
  },
  photoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  photoDotActive: {
    width: 18,
    backgroundColor: PRIMARY,
  },
  bodyContent: {
    padding: 16,
  },
  headerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E4ECF7',
  },
  typeTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  typeTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A95A8',
  },
  statusTag: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: NAVY,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#8A95A8',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: PRIMARY,
  },
  sqftText: {
    fontSize: 10,
    color: '#8A95A8',
    marginTop: 2,
  },
  ratingTrustRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: NAVY,
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 11,
    color: '#9AA3B5',
  },
  noBrokerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${PRIMARY}18`,
    borderWidth: 1,
    borderColor: `${PRIMARY}30`,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  noBrokerText: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: '#E8EDF5',
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: NAVY,
  },
  metricLabel: {
    fontSize: 9,
    color: '#8A95A8',
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8EDF5',
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A95A8',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '46%',
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: `${PRIMARY}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#4A5568',
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    marginBottom: 20,
  },
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerAvatarText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  ownerName: {
    fontSize: 14,
    fontWeight: '700',
    color: NAVY,
  },
  ownerRole: {
    fontSize: 11,
    color: PRIMARY,
    fontWeight: '600',
  },
  ownerPhone: {
    fontSize: 11,
    color: '#8A95A8',
  },
  floatingBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F8',
    elevation: 8,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  callButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  whatsappButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F7F8FA',
    borderWidth: 1.5,
    borderColor: '#E4E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whatsappButtonText: {
    color: NAVY,
    fontSize: 14,
    fontWeight: '700',
  },
});
