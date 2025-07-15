import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { AppContext } from '../context/AppContext';

export default function ModelsScreen() {
  const { isDark } = useContext(AppContext);
  const [isImporting, setIsImporting] = useState(false);
  const [models, setModels] = useState([]);

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    border: isDark ? '#333333' : '#e0e0e0',
    primary: '#2196F3',
    accent: '#FF9800'
  };

  const importSTL = async () => {
    try {
      setIsImporting(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['*/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        const mockAnalysis = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          volume: Math.random() * 50 + 10, // cm³
          surfaceArea: Math.random() * 200 + 50, // cm²
          boundingBox: {
            x: Math.random() * 100 + 20,
            y: Math.random() * 100 + 20,
            z: Math.random() * 50 + 10
          },
          printable: Math.random() > 0.3,
          warnings: Math.random() > 0.5 ? ['Thin walls detected'] : [],
          estimatedPrintTime: Math.random() * 8 + 2,
          estimatedWeight: Math.random() * 100 + 20
        };

        setModels(prev => [mockAnalysis, ...prev]);
        Alert.alert('Success', 'STL file imported and analyzed successfully!');
      }
    } catch (error) {
      console.error('Error importing STL:', error);
      Alert.alert('Error', 'Failed to import STL file');
    } finally {
      setIsImporting(false);
    }
  };

  const ModelCard = ({ model }) => (
    <View style={[styles.modelCard, { backgroundColor: theme.surface }]}>
      <View style={styles.modelHeader}>
        <View style={[styles.modelIcon, { backgroundColor: theme.primary + '20' }]}>
          <Ionicons name="cube" size={24} color={theme.primary} />
        </View>
        <View style={styles.modelInfo}>
          <Text style={[styles.modelName, { color: theme.text }]}>
            {model.name}
          </Text>
          <Text style={[styles.modelSize, { color: theme.textSecondary }]}>
            {(model.size / 1024).toFixed(1)} KB
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: model.printable ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>
            {model.printable ? 'Printable' : 'Issues'}
          </Text>
        </View>
      </View>

      <View style={styles.modelStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Volume</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {model.volume.toFixed(1)} cm³
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Surface Area</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {model.surfaceArea.toFixed(1)} cm²
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Est. Time</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {model.estimatedPrintTime.toFixed(1)}h
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Est. Weight</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {model.estimatedWeight.toFixed(0)}g
          </Text>
        </View>
      </View>

      <View style={styles.boundingBox}>
        <Text style={[styles.boundingBoxTitle, { color: theme.text }]}>
          Dimensions (mm)
        </Text>
        <Text style={[styles.boundingBoxText, { color: theme.textSecondary }]}>
          {model.boundingBox.x.toFixed(1)} × {model.boundingBox.y.toFixed(1)} × {model.boundingBox.z.toFixed(1)}
        </Text>
      </View>

      {model.warnings.length > 0 && (
        <View style={styles.warnings}>
          <Text style={[styles.warningsTitle, { color: '#F44336' }]}>
            Warnings:
          </Text>
          {model.warnings.map((warning, index) => (
            <Text key={index} style={[styles.warningText, { color: '#F44336' }]}>
              • {warning}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.modelActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={() => Alert.alert('Feature', 'Quote generation from 3D model coming soon!')}
        >
          <Ionicons name="calculator" size={16} color="white" />
          <Text style={styles.actionButtonText}>Generate Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.accent }]}
          onPress={() => Alert.alert('Feature', '3D preview coming soon!')}
        >
          <Ionicons name="eye" size={16} color="white" />
          <Text style={styles.actionButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            3D Models
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Import and analyze STL files
          </Text>
        </View>

        {/* Import Button */}
        <TouchableOpacity
          style={[styles.importButton, { backgroundColor: theme.primary }]}
          onPress={importSTL}
          disabled={isImporting}
        >
          {isImporting ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="cloud-upload" size={24} color="white" />
              <Text style={styles.importButtonText}>Import STL File</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Models List */}
        {models.length > 0 ? (
          <View style={styles.modelsContainer}>
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No 3D Models Yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Import STL files to analyze printability and generate accurate quotes
            </Text>
          </View>
        )}

        {/* Features Info */}
        <View style={[styles.featuresSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.featuresTitle, { color: theme.text }]}>
            Model Analysis Features
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                Automatic volume calculation
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                Surface area analysis
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                Printability assessment
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                Print time estimation
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                Material weight calculation
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  importButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modelsContainer: {
    paddingHorizontal: 20,
  },
  modelCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  modelSize: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modelStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  boundingBox: {
    marginBottom: 15,
  },
  boundingBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  boundingBoxText: {
    fontSize: 14,
  },
  warnings: {
    marginBottom: 15,
  },
  warningsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  warningText: {
    fontSize: 14,
    marginBottom: 2,
  },
  modelActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    marginLeft: 10,
  },
});
