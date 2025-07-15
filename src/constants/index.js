export const QUICK_QUOTES = {
  'miniature': { name: '28mm Miniature', icon: '🎲', weight: 8, printTime: 3, supportWaste: 30, popular: true, category: 'Gaming', complexity: 'high', basePrice: 15 },
  'phone-case': { name: 'Phone Case', icon: '📱', weight: 25, printTime: 2.5, supportWaste: 15, popular: true, category: 'Accessories', complexity: 'low', basePrice: 20 },
  'prototype': { name: 'Prototype Part', icon: '⚙️', weight: 75, printTime: 4, supportWaste: 10, category: 'Engineering', complexity: 'medium', basePrice: 50 },
  'cosplay': { name: 'Cosplay Prop', icon: '🗡️', weight: 150, printTime: 8, supportWaste: 20, category: 'Entertainment', complexity: 'high', basePrice: 100 },
  'jewelry': { name: 'Jewelry/Ring', icon: '💍', weight: 5, printTime: 1, supportWaste: 40, category: 'Fashion', complexity: 'very-high', basePrice: 30 },
  'figurine': { name: 'Figurine', icon: '🗿', weight: 50, printTime: 6, supportWaste: 25, category: 'Collectibles', complexity: 'high', basePrice: 60 },
  'replacement': { name: 'Replacement Part', icon: '🔧', weight: 30, printTime: 2, supportWaste: 5, category: 'Repair', complexity: 'low', basePrice: 15 },
  'custom': { name: 'Custom Project', icon: '✨', weight: 50, printTime: 3, supportWaste: 15, category: 'Custom', complexity: 'medium', basePrice: 40 },
  'terrain': { name: 'Terrain Piece', icon: '🏔️', weight: 100, printTime: 5, supportWaste: 10, category: 'Gaming', complexity: 'medium', basePrice: 45 },
  'medical': { name: 'Medical Model', icon: '🏥', weight: 40, printTime: 4, supportWaste: 5, category: 'Professional', complexity: 'high', basePrice: 80 },
  'architectural': { name: 'Architectural Model', icon: '🏢', weight: 200, printTime: 10, supportWaste: 15, category: 'Professional', complexity: 'high', basePrice: 150 },
  'educational': { name: 'Educational Model', icon: '🎓', weight: 60, printTime: 4, supportWaste: 10, category: 'Education', complexity: 'medium', basePrice: 35 }
};

export const MATERIALS = {
  'PLA': { name: 'PLA', color: '#4CAF50', costPerKg: 20, density: 1.24, temp: { nozzle: 210, bed: 60 }, description: 'Easy to print, biodegradable', strength: 3, flexibility: 2, heatResistance: 2, ecoRating: 5, printDifficulty: 1 },
  'PLA+': { name: 'PLA+', color: '#66BB6A', costPerKg: 25, density: 1.24, temp: { nozzle: 215, bed: 65 }, description: 'Stronger than PLA', strength: 4, flexibility: 3, heatResistance: 2, ecoRating: 5, printDifficulty: 1 },
  'PETG': { name: 'PETG', color: '#2196F3', costPerKg: 25, density: 1.27, temp: { nozzle: 240, bed: 80 }, description: 'Strong, chemical resistant', strength: 4, flexibility: 4, heatResistance: 4, ecoRating: 3, printDifficulty: 2 },
  'ABS': { name: 'ABS', color: '#FF9800', costPerKg: 22, density: 1.04, temp: { nozzle: 250, bed: 100 }, description: 'Durable, heat resistant', strength: 4, flexibility: 3, heatResistance: 5, ecoRating: 2, printDifficulty: 3 },
  'TPU': { name: 'TPU', color: '#9C27B0', costPerKg: 40, density: 1.21, temp: { nozzle: 230, bed: 60 }, description: 'Flexible, rubber-like', strength: 3, flexibility: 5, heatResistance: 3, ecoRating: 3, printDifficulty: 4 },
  'Resin': { name: 'Resin', color: '#E91E63', costPerKg: 35, density: 1.1, temp: { nozzle: 0, bed: 0 }, description: 'High detail, SLA/DLP', strength: 3, flexibility: 1, heatResistance: 2, ecoRating: 1, printDifficulty: 2 },
  'Nylon': { name: 'Nylon', color: '#607D8B', costPerKg: 50, density: 1.15, temp: { nozzle: 260, bed: 80 }, description: 'Strong, flexible', strength: 5, flexibility: 4, heatResistance: 4, ecoRating: 3, printDifficulty: 4 },
  'ASA': { name: 'ASA', color: '#FF5722', costPerKg: 30, density: 1.07, temp: { nozzle: 260, bed: 100 }, description: 'UV resistant, outdoor', strength: 4, flexibility: 3, heatResistance: 5, ecoRating: 2, printDifficulty: 3 },
  'PC': { name: 'PC', color: '#795548', costPerKg: 60, density: 1.2, temp: { nozzle: 280, bed: 110 }, description: 'Extremely strong', strength: 5, flexibility: 2, heatResistance: 5, ecoRating: 2, printDifficulty: 5 },
  'Wood': { name: 'Wood Fill', color: '#8D6E63', costPerKg: 35, density: 1.15, temp: { nozzle: 200, bed: 60 }, description: 'Wood-like finish', strength: 2, flexibility: 2, heatResistance: 2, ecoRating: 4, printDifficulty: 2 }
};

export const PRICING_MODELS = {
  'hobbyist': { name: 'Hobbyist', hourlyRate: 2, markup: 2.0, description: 'Just covering costs', icon: '🏠', color: '#4CAF50' },
  'side-hustle': { name: 'Side Hustle', hourlyRate: 5, markup: 3.0, description: 'Making some profit', icon: '💼', color: '#2196F3' },
  'business': { name: 'Business', hourlyRate: 10, markup: 4.0, description: 'Professional service', icon: '🏢', color: '#FF9800' },
  'premium': { name: 'Premium', hourlyRate: 20, markup: 5.0, description: 'Rush jobs & quality', icon: '⭐', color: '#9C27B0' },
  'enterprise': { name: 'Enterprise', hourlyRate: 35, markup: 6.0, description: 'B2B contracts', icon: '🏭', color: '#E91E63' }
};

export const PRINTER_PROFILES = {
  'ender3': { name: 'Ender 3', speed: 60, buildVolume: { x: 220, y: 220, z: 250 }, reliability: 0.85, category: 'FDM' },
  'prusa-mk3': { name: 'Prusa MK3S+', speed: 80, buildVolume: { x: 250, y: 210, z: 210 }, reliability: 0.95, category: 'FDM' },
  'bambu-x1': { name: 'Bambu Lab X1', speed: 150, buildVolume: { x: 256, y: 256, z: 256 }, reliability: 0.98, category: 'FDM' },
  'resin': { name: 'Resin Printer', speed: 30, buildVolume: { x: 192, y: 120, z: 200 }, reliability: 0.90, category: 'SLA' },
  'form3': { name: 'Form 3+', speed: 40, buildVolume: { x: 145, y: 145, z: 185 }, reliability: 0.97, category: 'SLA' },
  'cr10': { name: 'CR-10', speed: 70, buildVolume: { x: 300, y: 300, z: 400 }, reliability: 0.87, category: 'FDM' }
};
