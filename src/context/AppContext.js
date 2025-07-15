import React, { useState, useEffect, createContext, useRef, useCallback } from 'react';
import { Animated, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { MATERIALS, PRICING_MODELS, QUICK_QUOTES } from '../constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const AppContext = createContext();

export function AppProvider({ children }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const [selectedQuote, setSelectedQuote] = useState('custom');
  const [material, setMaterial] = useState('PLA');
  const [weight, setWeight] = useState('');
  const [printTime, setPrintTime] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [pricingModel, setPricingModel] = useState('business');
  const [rushOrder, setRushOrder] = useState(false);
  const [includeShipping, setIncludeShipping] = useState(true);
  const [postProcessing, setPostProcessing] = useState(false);
  const [fixedCosts, setFixedCosts] = useState('0');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [quotesThisMonth, setQuotesThisMonth] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
    setupNotifications();
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const quote = QUICK_QUOTES[selectedQuote];
    if (quote && (selectedQuote !== 'custom' || !weight)) {
      setWeight(quote.weight.toString());
      setPrintTime(quote.printTime.toString());
    }
  }, [selectedQuote]);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('filamentflow_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setSavedQuotes(data.savedQuotes || []);
        setMonthlyRevenue(data.monthlyRevenue || 0);
        setTotalProfit(data.totalProfit || 0);
        setIsPro(data.isPro || false);
        setQuotesThisMonth(data.quotesThisMonth || 0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      const data = {
        savedQuotes,
        monthlyRevenue,
        totalProfit,
        isPro,
        quotesThisMonth,
        lastBackupDate: new Date().toISOString()
      };
      await AsyncStorage.setItem('filamentflow_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const setupNotifications = async () => {
    try {
      await Notifications.requestPermissionsAsync();
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };

  const calculatePrice = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        const weightNum = parseFloat(weight) || 0;
        const timeNum = parseFloat(printTime) || 0;
        const quantityNum = parseInt(quantity) || 1;
        const fixedCostNum = parseFloat(fixedCosts) || 0;
        
        const selectedMaterial = MATERIALS[material];
        const selectedPricing = PRICING_MODELS[pricingModel];
        
        const materialCost = (weightNum / 1000) * selectedMaterial.costPerKg;
        
        const laborCost = timeNum * selectedPricing.hourlyRate;
        
        let baseCost = (materialCost + laborCost) * selectedPricing.markup;
        
        if (postProcessing) {
          baseCost += baseCost * 0.3;
        }
        
        if (rushOrder) {
          baseCost += baseCost * 0.5;
        }
        
        let totalCost = baseCost * quantityNum;
        
        if (quantityNum >= 10) {
          totalCost *= 0.9;
        }
        if (quantityNum >= 50) {
          totalCost *= 0.85;
        }
        
        totalCost += fixedCostNum;
        
        let shippingCost = 0;
        if (includeShipping) {
          shippingCost = quantityNum <= 5 ? 10 : 15;
          totalCost += shippingCost;
        }
        
        const result = {
          totalPrice: totalCost.toFixed(2),
          pricePerUnit: (totalCost / quantityNum).toFixed(2),
          materialCost: (materialCost * quantityNum).toFixed(2),
          laborCost: (laborCost * quantityNum).toFixed(2),
          shippingCost: shippingCost.toFixed(2),
          breakdown: {
            material: materialCost,
            labor: laborCost,
            markup: selectedPricing.markup,
            quantity: quantityNum,
            postProcessing,
            rushOrder,
            shipping: shippingCost
          }
        };
        
        setCalculatedPrice(result);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        
      } catch (error) {
        console.error('Price calculation error:', error);
        Alert.alert('Error', 'Failed to calculate price. Please check your inputs.');
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  }, [weight, printTime, quantity, material, pricingModel, rushOrder, includeShipping, postProcessing, fixedCosts]);

  const saveQuote = useCallback(async () => {
    if (!calculatedPrice) {
      Alert.alert('Error', 'Please calculate the price first');
      return;
    }
    
    try {
      const quote = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        customerName: customerName || 'Anonymous',
        projectNotes,
        selectedQuote,
        material,
        weight: parseFloat(weight),
        printTime: parseFloat(printTime),
        quantity: parseInt(quantity),
        pricingModel,
        rushOrder,
        includeShipping,
        postProcessing,
        fixedCosts: parseFloat(fixedCosts),
        calculatedPrice
      };
      
      const newQuotes = [quote, ...savedQuotes];
      setSavedQuotes(newQuotes);
      
      const revenue = parseFloat(calculatedPrice.totalPrice);
      setMonthlyRevenue(prev => prev + revenue);
      setTotalProfit(prev => prev + revenue * 0.3);
      setQuotesThisMonth(prev => prev + 1);
      
      await saveUserData();
      
      Alert.alert('Success', 'Quote saved successfully!');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      setCustomerName('');
      setProjectNotes('');
      setCalculatedPrice(null);
      
    } catch (error) {
      console.error('Error saving quote:', error);
      Alert.alert('Error', 'Failed to save quote');
    }
  }, [calculatedPrice, customerName, projectNotes, selectedQuote, material, weight, printTime, quantity, pricingModel, rushOrder, includeShipping, postProcessing, fixedCosts, savedQuotes, saveUserData]);

  const contextValue = {
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
    calculatedPrice, setCalculatedPrice,
    
    savedQuotes, setSavedQuotes,
    monthlyRevenue, setMonthlyRevenue,
    totalProfit, setTotalProfit,
    isPro, setIsPro,
    quotesThisMonth, setQuotesThisMonth,
    customerName, setCustomerName,
    projectNotes, setProjectNotes,
    
    isCalculating, setIsCalculating,
    refreshing, setRefreshing,
    
    calculatePrice,
    saveQuote,
    saveUserData,
    loadUserData,
    
    isDark,
    
    fadeAnim,
    slideAnim,
    scaleAnim
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
