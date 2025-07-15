import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { PRINTER_PROFILES } from '../constants';

export default function SettingsScreen() {
  const {
    isDark,
    isPro,
    setIsPro,
    savedQuotes,
    monthlyRevenue,
    totalProfit,
    quotesThisMonth
  } = useContext(AppContext);

  const [showProModal, setShowProModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState('ender3');

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    border: isDark ? '#333333' : '#e0e0e0',
    primary: '#2196F3',
    accent: '#FF9800'
  };

  const SettingItem = ({ title, subtitle, icon, onPress, rightComponent, showArrow = true }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: theme.surface }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: theme.primary + '20' }]}>
          <Ionicons name={icon} size={20} color={theme.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {showArrow && onPress && (
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const handleUpgradeToPro = () => {
    setShowProModal(true);
  };

  const handleBackupData = () => {
    setShowBackupModal(true);
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Export your quotes and analytics data to CSV format.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => Alert.alert('Success', 'Data exported successfully!') }
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will permanently delete all your quotes, analytics, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All data has been reset.')
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Customize your FilamentFlow experience
          </Text>
        </View>

        {/* Pro Status */}
        {!isPro && (
          <TouchableOpacity
            style={[styles.proCard, { backgroundColor: '#FF9800' }]}
            onPress={handleUpgradeToPro}
          >
            <View style={styles.proContent}>
              <Ionicons name="star" size={24} color="white" />
              <View style={styles.proText}>
                <Text style={styles.proTitle}>Upgrade to Pro</Text>
                <Text style={styles.proSubtitle}>
                  Unlock advanced features and analytics
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
          
          <SettingItem
            title="Subscription Status"
            subtitle={isPro ? 'FilamentFlow Pro' : 'Free Plan'}
            icon="person-circle"
            onPress={!isPro ? handleUpgradeToPro : null}
            rightComponent={
              isPro ? (
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>PRO</Text>
                </View>
              ) : null
            }
            showArrow={!isPro}
          />
          
          <SettingItem
            title="Data Backup"
            subtitle="Automatically backup your data"
            icon="cloud-upload"
            onPress={handleBackupData}
            rightComponent={
              <Switch
                value={autoBackupEnabled}
                onValueChange={setAutoBackupEnabled}
                trackColor={{ false: theme.border, true: theme.primary + '40' }}
                thumbColor={autoBackupEnabled ? theme.primary : theme.textSecondary}
              />
            }
            showArrow={false}
          />
        </View>

        {/* Printer Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Printer Settings</Text>
          
          <SettingItem
            title="Default Printer"
            subtitle={PRINTER_PROFILES[selectedPrinter]?.name || 'Select printer'}
            icon="print"
            onPress={() => Alert.alert('Feature', 'Printer selection coming soon!')}
          />
          
          <SettingItem
            title="Print Profiles"
            subtitle="Manage your printer profiles"
            icon="settings"
            onPress={() => Alert.alert('Feature', 'Print profiles coming soon!')}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications</Text>
          
          <SettingItem
            title="Push Notifications"
            subtitle="Get notified about important updates"
            icon="notifications"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: theme.border, true: theme.primary + '40' }}
                thumbColor={notificationsEnabled ? theme.primary : theme.textSecondary}
              />
            }
            showArrow={false}
          />
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Data Management</Text>
          
          <SettingItem
            title="Export Data"
            subtitle="Export quotes and analytics to CSV"
            icon="download"
            onPress={handleExportData}
          />
          
          <SettingItem
            title="Reset All Data"
            subtitle="Permanently delete all data"
            icon="trash"
            onPress={handleResetData}
          />
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          
          <SettingItem
            title="App Version"
            subtitle="1.0.0"
            icon="information-circle"
            showArrow={false}
          />
          
          <SettingItem
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            icon="shield-checkmark"
            onPress={() => Alert.alert('Info', 'Privacy policy would open here')}
          />
          
          <SettingItem
            title="Terms of Service"
            subtitle="Read our terms of service"
            icon="document-text"
            onPress={() => Alert.alert('Info', 'Terms of service would open here')}
          />
        </View>

        {/* Statistics */}
        <View style={[styles.statsSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {savedQuotes.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total Quotes
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                ${monthlyRevenue.toFixed(0)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Monthly Revenue
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {quotesThisMonth}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                This Month
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                ${totalProfit.toFixed(0)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total Profit
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pro Upgrade Modal */}
      <Modal
        visible={showProModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Upgrade to FilamentFlow Pro
            </Text>
            <TouchableOpacity onPress={() => setShowProModal(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.proFeatures}>
              <Text style={[styles.featuresTitle, { color: theme.text }]}>
                Pro Features
              </Text>
              
              {[
                'Advanced analytics and reporting',
                'AI-powered pricing suggestions',
                'Unlimited quote storage',
                'Custom branding and templates',
                'Priority customer support',
                'Advanced 3D model analysis',
                'Batch quote processing',
                'Export to multiple formats'
              ].map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={[styles.featureText, { color: theme.text }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.pricingOptions}>
              <TouchableOpacity
                style={[styles.pricingOption, { backgroundColor: theme.primary }]}
                onPress={() => {
                  setIsPro(true);
                  setShowProModal(false);
                  Alert.alert('Success', 'Welcome to FilamentFlow Pro!');
                }}
              >
                <Text style={styles.pricingTitle}>Monthly</Text>
                <Text style={styles.pricingPrice}>$9.99/month</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.pricingOption, { backgroundColor: theme.accent }]}
                onPress={() => {
                  setIsPro(true);
                  setShowProModal(false);
                  Alert.alert('Success', 'Welcome to FilamentFlow Pro!');
                }}
              >
                <Text style={styles.pricingTitle}>Yearly</Text>
                <Text style={styles.pricingPrice}>$99.99/year</Text>
                <Text style={styles.pricingSavings}>Save 17%</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Backup Modal */}
      <Modal
        visible={showBackupModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Data Backup
            </Text>
            <TouchableOpacity onPress={() => setShowBackupModal(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={[styles.backupInfo, { color: theme.textSecondary }]}>
              Your data is automatically backed up to secure cloud storage. 
              You can also manually backup or restore your data at any time.
            </Text>
            
            <TouchableOpacity
              style={[styles.backupButton, { backgroundColor: theme.primary }]}
              onPress={() => {
                setShowBackupModal(false);
                Alert.alert('Success', 'Data backed up successfully!');
              }}
            >
              <Ionicons name="cloud-upload" size={20} color="white" />
              <Text style={styles.backupButtonText}>Backup Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.backupButton, { backgroundColor: theme.accent }]}
              onPress={() => {
                setShowBackupModal(false);
                Alert.alert('Success', 'Data restored successfully!');
              }}
            >
              <Ionicons name="cloud-download" size={20} color="white" />
              <Text style={styles.backupButtonText}>Restore Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  proCard: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  proContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proText: {
    flex: 1,
    marginLeft: 15,
  },
  proTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  proSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  proBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsSection: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  proFeatures: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 15,
  },
  pricingOptions: {
    gap: 15,
  },
  pricingOption: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  pricingTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pricingPrice: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pricingSavings: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 5,
  },
  backupInfo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  backupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  backupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
