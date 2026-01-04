export type ChainType = 'BTC' | 'ETH' | 'BSC' | 'TRX' | 'SOL';

export type WalletSource = 'generated' | 'connected' | 'imported';

export type UserStatus = 'active' | 'suspended' | 'banned';

export type UserRole = 'user' | 'admin';

export interface Wallet {
  id: string;
  userId: string;
  chain: ChainType;
  address: string;
  label: string | null;
  source: WalletSource;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: any;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  targetUserId: string | null;
  details: any;
  createdAt: string;
}

export interface SystemSettings {
  id: string;
  key: string;
  value: any;
  updatedAt: string;
}

export interface WalletBalance {
  chain: ChainType;
  balance: number;
  usdValue: number;
}

export interface PortfolioData {
  totalValue: number;
  totalChange24h: number;
  balances: WalletBalance[];
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercentage24h: number;
  marketCap: number;
  volume24h: number;
}
