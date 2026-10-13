import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  ShieldCheck,
  ChevronRight,
  Building2,
  PhoneCall,
  Bell,
  MessageSquare,
  Settings,
} from 'lucide-react-native';

const NAVY = '#002B63';
const PRIMARY = '#3DA84A';

export const ProfileScreen = ({ onSignOut }) => {
  const menuItems = [
    { label: 'My Listings', icon: Building2, sub: '0 active listings' },
    { label: 'Contact Requests', icon: PhoneCall, sub: 'No pending requests' },
    { label: 'Notifications', icon: Bell, sub: 'All caught up' },
    { label: 'Help & Support', icon: MessageSquare, sub: 'FAQ · Chat with us' },
    { label: 'Settings', icon: Settings, sub: 'Account · Privacy' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Profile Box */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JL</Text>
        </View>

        <View>
          <Text style={styles.userName}>John Lastname</Text>
          <Text style={styles.userPhone}>+91 98765 43210</Text>
          <View style={styles.badgeRow}>
            <ShieldCheck size={11} color={PRIMARY} />
            <Text style={styles.badgeText}>Verified Owner</Text>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <View style={styles.menuCard}>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  idx < menuItems.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconWrapper}>
                  <Icon size={18} color={PRIMARY} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <ChevronRight size={14} color="#C8D0DF" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={onSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  userPhone: {
    fontSize: 12,
    color: '#9AA3B5',
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: PRIMARY,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF1F8',
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F8',
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${PRIMARY}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: NAVY,
  },
  menuSub: {
    fontSize: 11,
    color: '#9AA3B5',
  },
  signOutBtn: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: '700',
  },
});
