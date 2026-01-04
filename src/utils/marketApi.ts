/**
 * Crypto Market Data API
 * Uses CoinGecko free API (no API key required)
 */

const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  image: string;
}

export interface CoinChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

/**
 * Fetch current prices for multiple coins
 */
export const fetchCoinPrices = async (
  coinIds: string[] = ['bitcoin', 'ethereum', 'binancecoin', 'tron']
): Promise<CoinPrice[]> => {
  try {
    const ids = coinIds.join(',');
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin prices');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching coin prices:', error);
    throw error;
  }
};

/**
 * Fetch historical chart data for a coin
 */
export const fetchCoinChart = async (
  coinId: string,
  days: number = 7
): Promise<CoinChartData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

/**
 * Fetch detailed coin information
 */
export const fetchCoinDetails = async (coinId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};

/**
 * Search for coins
 */
export const searchCoins = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to search coins');
    }
    
    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};

/**
 * Format price with proper decimals
 */
export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else if (price >= 0.01) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(price);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 8,
    }).format(price);
  }
};

/**
 * Format market cap / volume
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

/**
 * Format percentage change
 */
export const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

/**
 * Get chain logo/icon
 */
export const getChainLogo = (chain: string): string => {
  const logos: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    BSC: '🔶',
    TRX: '◉',
    SOL: '◎',
  };
  return logos[chain] || '●';
};

/**
 * Get chain color
 */
export const getChainColor = (chain: string): string => {
  const colors: Record<string, string> = {
    BTC: '#f7931a',
    ETH: '#627eea',
    BSC: '#f3ba2f',
    TRX: '#eb0029',
    SOL: '#14f195',
  };
  return colors[chain] || '#8b5cf6';
};

/**
 * Mock transaction data for explorer (read-only)
 */
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  chain: string;
  status: 'success' | 'pending' | 'failed';
}

export const generateMockTransactions = (address: string, count: number = 10): Transaction[] => {
  const transactions: Transaction[] = [];
  const chains = ['BTC', 'ETH', 'BSC', 'TRX'];
  
  for (let i = 0; i < count; i++) {
    transactions.push({
      hash: `0x${Math.random().toString(16).slice(2, 66)}`,
      from: i % 2 === 0 ? address : `0x${Math.random().toString(16).slice(2, 42)}`,
      to: i % 2 === 0 ? `0x${Math.random().toString(16).slice(2, 42)}` : address,
      value: (Math.random() * 10).toFixed(4),
      timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      chain: chains[Math.floor(Math.random() * chains.length)],
      status: Math.random() > 0.1 ? 'success' : Math.random() > 0.5 ? 'pending' : 'failed',
    });
  }
  
  return transactions.sort((a, b) => b.timestamp - a.timestamp);
};
