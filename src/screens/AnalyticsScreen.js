import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const { width: screenWidth } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const {
    savedQuotes,
    monthlyRevenue,
    totalProfit,
    quotesThisMonth,
    isDark
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

  const chartConfig = {
    backgroundColor: theme.surface,
    backgroundGradientFrom: theme.surface,
    backgroundGradientTo: theme.surface,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.primary
    }
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [200, 450, 280, 800, 990, monthlyRevenue || 1200],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const materialUsageData = {
    labels: ["PLA", "PETG", "ABS", "TPU", "Resin"],
    datasets: [
      {
        data: [45, 25, 15, 10, 5]
      }
    ]
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{title}</Text>
    </View>
  );

  const QuoteItem = ({ item }) => (
    <View style={[styles.quoteItem, { backgroundColor: theme.surface }]}>
      <View style={styles.quoteHeader}>
        <Text style={[styles.customerName, { color: theme.text }]}>
          {item.customerName}
        </Text>
        <Text style={[styles.quotePrice, { color: theme.primary }]}>
          ${item.calculatedPrice?.totalPrice}
        </Text>
      </View>
      <Text style={[styles.quoteDate, { color: theme.textSecondary }]}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text style={[styles.quoteMaterial, { color: theme.textSecondary }]}>
        {item.material} • {item.weight}g • {item.quantity} units
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Business Analytics
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Track your 3D printing business
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Monthly Revenue"
            value={`$${monthlyRevenue.toFixed(2)}`}
            icon="trending-up"
            color="#4CAF50"
          />
          <StatCard
            title="Total Profit"
            value={`$${totalProfit.toFixed(2)}`}
            icon="cash"
            color="#2196F3"
          />
          <StatCard
            title="Quotes This Month"
            value={quotesThisMonth.toString()}
            icon="document-text"
            color="#FF9800"
          />
          <StatCard
            title="Success Rate"
            value="85%"
            icon="checkmark-circle"
            color="#9C27B0"
          />
        </View>

        {/* Revenue Chart */}
        <View style={[styles.chartSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.chartTitle, { color: theme.text }]}>
            Revenue Trend
          </Text>
          <LineChart
            data={revenueData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Material Usage Chart */}
        <View style={[styles.chartSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.chartTitle, { color: theme.text }]}>
            Material Usage
          </Text>
          <BarChart
            data={materialUsageData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        {/* Recent Quotes */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Quotes
          </Text>
          {savedQuotes.length > 0 ? (
            <FlatList
              data={savedQuotes.slice(0, 5)}
              renderItem={({ item }) => <QuoteItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={48} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No quotes yet
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                Create your first quote to see analytics
              </Text>
            </View>
          )}
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (screenWidth - 45) / 2,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  chartSection: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
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
  quoteItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quotePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  quoteMaterial: {
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});
