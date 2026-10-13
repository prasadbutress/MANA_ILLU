import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Search, Heart } from 'lucide-react-native';

const PRIMARY = '#3DA84A';

export const BottomTabBar = ({ active, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onChange('home')}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconWrapper,
            active === 'home' && { backgroundColor: `${PRIMARY}22` },
          ]}
        >
          <Home
            size={20}
            strokeWidth={active === 'home' ? 2.5 : 1.8}
            color={active === 'home' ? PRIMARY : '#9AA3B5'}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: active === 'home' ? PRIMARY : '#9AA3B5' },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onChange('search')}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconWrapper,
            active === 'search' && { backgroundColor: `${PRIMARY}22` },
          ]}
        >
          <Search
            size={20}
            strokeWidth={active === 'search' ? 2.5 : 1.8}
            color={active === 'search' ? PRIMARY : '#9AA3B5'}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: active === 'search' ? PRIMARY : '#9AA3B5' },
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>

      {/* Center Spacer for Floating Post Button */}
      <View style={styles.centerSpacer} />

      {/* Saved Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onChange('saved')}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconWrapper,
            active === 'saved' && { backgroundColor: `${PRIMARY}22` },
          ]}
        >
          <Heart
            size={20}
            strokeWidth={active === 'saved' ? 2.5 : 1.8}
            fill={active === 'saved' ? PRIMARY : 'none'}
            color={active === 'saved' ? PRIMARY : '#9AA3B5'}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: active === 'saved' ? PRIMARY : '#9AA3B5' },
          ]}
        >
          Saved
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onChange('profile')}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconWrapper,
            active === 'profile' && { backgroundColor: `${PRIMARY}22` },
          ]}
        >
          <View
            style={[
              styles.avatarInitial,
              { backgroundColor: active === 'profile' ? PRIMARY : '#E2E6EF' },
            ]}
          >
            <Text
              style={[
                styles.avatarInitialText,
                { color: active === 'profile' ? '#fff' : '#9AA3B5' },
              ]}
            >
              JL
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: active === 'profile' ? PRIMARY : '#9AA3B5' },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

      {/* Floating Center Elevated Post Button */}
      <TouchableOpacity
        style={styles.floatingCenterButton}
        onPress={() => onChange('post')}
        activeOpacity={0.85}
      >
        <View style={styles.floatingInnerCircle}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: active === 'post' ? PRIMARY : '#9AA3B5', marginTop: -2 },
          ]}
        >
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#EEF1F8',
    paddingBottom: 8,
    elevation: 8,
    shadowColor: '#002B63',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 2,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  centerSpacer: {
    flex: 1,
  },
  avatarInitial: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitialText: {
    fontSize: 9,
    fontWeight: '800',
  },
  floatingCenterButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -29,
    bottom: 6,
    alignItems: 'center',
  },
  floatingInnerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: '#ffffff',
    elevation: 8,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  plusIcon: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
