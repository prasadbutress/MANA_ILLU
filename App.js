import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthChoiceScreen } from './src/screens/AuthChoiceScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { OTPScreen } from './src/screens/OTPScreen';
import { ListScreen } from './src/screens/ListScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { SearchTabScreen } from './src/screens/SearchTabScreen';
import { PostPropertyScreen } from './src/screens/PostPropertyScreen';
import { SavedScreen } from './src/screens/SavedScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchFilterModal } from './src/screens/SearchFilterModal';
import { NotificationModal } from './src/screens/NotificationModal';
import { BottomTabBar } from './src/components/BottomTabBar';

export default function App() {
  // Navigation stack state: 'splash' | 'onboarding' | 'auth-choice' | 'signup' | 'otp-signup' | 'signin' | 'otp-signin' | 'home'
  const [currentStep, setCurrentStep] = useState('splash');
  const [signupData, setSignupData] = useState(null);
  const [signinMobile, setSigninMobile] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [activeTab, setActiveTab] = useState('home');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Render tab content inside home screen
  function renderActiveTab() {
    if (activeTab === 'search') {
      return <SearchTabScreen onSelectLocality={() => setActiveTab('home')} />;
    }
    if (activeTab === 'post') {
      return <PostPropertyScreen onBack={() => setActiveTab('home')} />;
    }
    if (activeTab === 'saved') {
      return (
        <SavedScreen
          favorites={favorites}
          onSelect={(item) => {
            setSelectedProperty(item);
            setActiveTab('home');
          }}
        />
      );
    }
    if (activeTab === 'profile') {
      return <ProfileScreen onSignOut={() => setCurrentStep('auth-choice')} />;
    }

    // Default Home / Feed Screen
    if (selectedProperty) {
      return (
        <DetailScreen
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    return (
      <ListScreen
        onSelect={setSelectedProperty}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />
    );
  }

  // Stack Navigator
  function renderCurrentScreen() {
    switch (currentStep) {
      case 'splash':
        return <SplashScreen onDone={() => setCurrentStep('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onDone={() => setCurrentStep('auth-choice')} />;
      case 'auth-choice':
        return (
          <AuthChoiceScreen
            onSignUp={() => setCurrentStep('signup')}
            onSignIn={() => setCurrentStep('signin')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onNext={(data) => {
              setSignupData(data);
              setCurrentStep('otp-signup');
            }}
            onBack={() => setCurrentStep('auth-choice')}
          />
        );
      case 'otp-signup':
        return (
          <OTPScreen
            mobile={signupData?.mobile || '98480 12345'}
            onVerify={() => setCurrentStep('home')}
            onBack={() => setCurrentStep('signup')}
          />
        );
      case 'signin':
        return (
          <SignInScreen
            onNext={(mob) => {
              setSigninMobile(mob);
              setCurrentStep('otp-signin');
            }}
            onBack={() => setCurrentStep('auth-choice')}
          />
        );
      case 'otp-signin':
        return (
          <OTPScreen
            mobile={signinMobile || '98480 12345'}
            onVerify={() => setCurrentStep('home')}
            onBack={() => setCurrentStep('signin')}
          />
        );
      case 'home':
        return (
          <View style={styles.appShell}>
            <View style={{ flex: 1 }}>{renderActiveTab()}</View>
            {activeTab !== 'post' && !selectedProperty && (
              <BottomTabBar active={activeTab} onChange={setActiveTab} />
            )}
            {/* Search Filter Modal */}
            <SearchFilterModal
              visible={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={() => setIsFilterOpen(false)}
            />
            {/* Notification Modal */}
            <NotificationModal
              visible={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderCurrentScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
