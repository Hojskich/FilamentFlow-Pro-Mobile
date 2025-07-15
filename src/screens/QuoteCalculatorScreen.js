import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Switch,
  ActivityIndicator,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { QUICK_QUOTES, MATERIALS, PRICING_MODELS } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

export default function QuoteCalculatorScreen() {
  const {
    selectedQuote, setSelectedQuote,
    material, setMaterial,
    weight, setWeight,
    printTime, setPrintTime,
    quantity, setQuantity,
    pricingModel, setPricingModel,
    rushOrder, setRushOrder,
    includeShipping, setIncludeShipping,
    postProcessing, setPostProcessing,
    fixedCosts, setFixedCosts,
    calculatedPrice,
    customerName, setCustomerName,
    projectNotes, setProjectNotes,
    isCalculating,
    calculatePrice,
    saveQuote,
    isDark,
    fadeAnim,
    slideAnim,
    scaleAnim
  } = useContext(AppContext);

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    surface: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    border: isDark ? '#333333' : '#e0e0e0',
    primary: '#2196F3',
    accent: '#FF9800'
  };

  return (
    <Animated.View style={[
      styles.container,
      { backgroundColor: theme.background },
      {
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ]
      }
    ]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            FilamentFlow Pro
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Professional 3D Printing Quotes
          </Text>
        </View>

        {/* Quick Quote Selection */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Quote Templates
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickQuoteContainer}>
              {Object.entries(QUICK_QUOTES).map(([key, quote]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.quickQuoteCard,
                    selectedQuote === key && { backgroundColor: theme.primary + '20', borderColor: theme.primary }
                  ]}
                  onPress={() => setSelectedQuote(key)}
                >
                  <Text style={styles.quickQuoteIcon}>{quote.icon}</Text>
                  <Text style={[styles.quickQuoteName, { color: theme.text }]}>
                    {quote.name}
                  </Text>
                  {quote.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Customer Information */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Customer Information
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            placeholder="Customer Name"
            placeholderTextColor={theme.textSecondary}
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            style={[styles.textArea, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            placeholder="Project Notes"
            placeholderTextColor={theme.textSecondary}
            value={projectNotes}
            onChangeText={setProjectNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Material Selection */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Material Selection
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.materialContainer}>
              {Object.entries(MATERIALS).map(([key, mat]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.materialCard,
                    { backgroundColor: mat.color + '20' },
                    material === key && { borderColor: mat.color, borderWidth: 2 }
                  ]}
                  onPress={() => setMaterial(key)}
                >
                  <View style={[styles.materialColorDot, { backgroundColor: mat.color }]} />
                  <Text style={[styles.materialName, { color: theme.text }]}>
                    {mat.name}
                  </Text>
                  <Text style={[styles.materialPrice, { color: theme.textSecondary }]}>
                    ${mat.costPerKg}/kg
                  </Text>
                  <Text style={[styles.materialDescription, { color: theme.textSecondary }]}>
                    {mat.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Print Parameters */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Print Parameters
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Weight (g)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Print Time (h)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
                value={printTime}
                onChangeText={setPrintTime}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Quantity</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                placeholder="1"
                placeholderTextColor={theme.textSecondary}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Fixed Costs ($)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
                value={fixedCosts}
                onChangeText={setFixedCosts}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Pricing Model */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Pricing Model
          </Text>
          <View style={styles.pricingContainer}>
            {Object.entries(PRICING_MODELS).map(([key, model]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.pricingCard,
                  { backgroundColor: model.color + '20' },
                  pricingModel === key && { borderColor: model.color, borderWidth: 2 }
                ]}
                onPress={() => setPricingModel(key)}
              >
                <Text style={styles.pricingIcon}>{model.icon}</Text>
                <Text style={[styles.pricingName, { color: theme.text }]}>
                  {model.name}
                </Text>
                <Text style={[styles.pricingRate, { color: theme.textSecondary }]}>
                  ${model.hourlyRate}/hr
                </Text>
                <Text style={[styles.pricingDescription, { color: theme.textSecondary }]}>
                  {model.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Options */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Additional Options
          </Text>
          <View style={styles.optionRow}>
            <Text style={[styles.optionLabel, { color: theme.text }]}>Rush Order (+50%)</Text>
            <Switch
              value={rushOrder}
              onValueChange={setRushOrder}
              trackColor={{ false: theme.border, true: theme.primary + '40' }}
              thumbColor={rushOrder ? theme.primary : theme.textSecondary}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={[styles.optionLabel, { color: theme.text }]}>Include Shipping</Text>
            <Switch
              value={includeShipping}
              onValueChange={setIncludeShipping}
              trackColor={{ false: theme.border, true: theme.primary + '40' }}
              thumbColor={includeShipping ? theme.primary : theme.textSecondary}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={[styles.optionLabel, { color: theme.text }]}>Post-Processing (+30%)</Text>
            <Switch
              value={postProcessing}
              onValueChange={setPostProcessing}
              trackColor={{ false: theme.border, true: theme.primary + '40' }}
              thumbColor={postProcessing ? theme.primary : theme.textSecondary}
            />
          </View>
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
          style={[styles.calculateButton, { backgroundColor: theme.primary }]}
          onPress={calculatePrice}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="calculator" size={24} color="white" />
              <Text style={styles.calculateButtonText}>Calculate Price</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Price Result */}
        {calculatedPrice && (
          <View style={[styles.section, { backgroundColor: theme.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Quote Result
            </Text>
            <View style={styles.priceResult}>
              <Text style={[styles.totalPrice, { color: theme.primary }]}>
                ${calculatedPrice.totalPrice}
              </Text>
              <Text style={[styles.pricePerUnit, { color: theme.textSecondary }]}>
                ${calculatedPrice.pricePerUnit} per unit
              </Text>
            </View>
            <View style={styles.breakdown}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.textSecondary }]}>Material Cost:</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>${calculatedPrice.materialCost}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.textSecondary }]}>Labor Cost:</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>${calculatedPrice.laborCost}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.textSecondary }]}>Shipping:</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>${calculatedPrice.shippingCost}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.accent }]}
              onPress={saveQuote}
            >
              <Ionicons name="save" size={20} color="white" />
              <Text style={styles.saveButtonText}>Save Quote</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickQuoteContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  quickQuoteCard: {
    width: 120,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  quickQuoteIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  quickQuoteName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  popularBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 5,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  materialContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  materialCard: {
    width: 140,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  materialColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  materialPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  materialDescription: {
    fontSize: 12,
    textAlign: 'left',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  pricingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pricingCard: {
    width: (screenWidth - 70) / 2,
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pricingIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  pricingName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pricingRate: {
    fontSize: 14,
    marginBottom: 4,
  },
  pricingDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  priceResult: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalPrice: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  pricePerUnit: {
    fontSize: 16,
    marginTop: 5,
  },
  breakdown: {
    marginBottom: 20,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  breakdownLabel: {
    fontSize: 16,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
