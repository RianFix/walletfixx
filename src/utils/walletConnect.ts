declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

export type WalletProvider = 'MetaMask' | 'Trust Wallet' | 'Phantom' | 'Coinbase Wallet' | 'WalletConnect';

export interface ConnectedWallet {
  address: string;
  provider: WalletProvider;
  chain: string;
}

/**
 * Connect to MetaMask
 */
export const connectMetaMask = async (): Promise<ConnectedWallet> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    
    return {
      address: accounts[0],
      provider: 'MetaMask',
      chain: chainId === '0x1' ? 'ETH' : chainId === '0x38' ? 'BSC' : 'Unknown',
    };
  } catch (error: any) {
    throw new Error(`MetaMask connection failed: ${error.message}`);
  }
};

/**
 * Connect to Trust Wallet (uses same interface as MetaMask)
 */
export const connectTrustWallet = async (): Promise<ConnectedWallet> => {
  if (!window.ethereum) {
    throw new Error('Trust Wallet is not installed');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    
    return {
      address: accounts[0],
      provider: 'Trust Wallet',
      chain: chainId === '0x1' ? 'ETH' : chainId === '0x38' ? 'BSC' : 'Unknown',
    };
  } catch (error: any) {
    throw new Error(`Trust Wallet connection failed: ${error.message}`);
  }
};

/**
 * Connect to Phantom (Solana wallet)
 */
export const connectPhantom = async (): Promise<ConnectedWallet> => {
  if (!window.solana || !window.solana.isPhantom) {
    throw new Error('Phantom wallet is not installed');
  }

  try {
    const response = await window.solana.connect();
    
    return {
      address: response.publicKey.toString(),
      provider: 'Phantom',
      chain: 'SOL',
    };
  } catch (error: any) {
    throw new Error(`Phantom connection failed: ${error.message}`);
  }
};

/**
 * Connect to Coinbase Wallet
 */
export const connectCoinbaseWallet = async (): Promise<ConnectedWallet> => {
  if (!window.ethereum || !window.ethereum.isCoinbaseWallet) {
    throw new Error('Coinbase Wallet is not installed');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    
    return {
      address: accounts[0],
      provider: 'Coinbase Wallet',
      chain: chainId === '0x1' ? 'ETH' : chainId === '0x38' ? 'BSC' : 'Unknown',
    };
  } catch (error: any) {
    throw new Error(`Coinbase Wallet connection failed: ${error.message}`);
  }
};

/**
 * Connect via WalletConnect
 */
export const connectWalletConnect = async (): Promise<ConnectedWallet> => {
  // WalletConnect v2 implementation would go here
  // For now, return a mock connection
  throw new Error('WalletConnect integration coming soon');
};

/**
 * Main wallet connection function
 */
export const connectWallet = async (provider: WalletProvider): Promise<ConnectedWallet> => {
  switch (provider) {
    case 'MetaMask':
      return connectMetaMask();
    case 'Trust Wallet':
      return connectTrustWallet();
    case 'Phantom':
      return connectPhantom();
    case 'Coinbase Wallet':
      return connectCoinbaseWallet();
    case 'WalletConnect':
      return connectWalletConnect();
    default:
      throw new Error('Unsupported wallet provider');
  }
};

/**
 * Disconnect wallet
 */
export const disconnectWallet = async (provider: WalletProvider): Promise<void> => {
  switch (provider) {
    case 'Phantom':
      if (window.solana) {
        await window.solana.disconnect();
      }
      break;
    default:
      // Most providers don't have explicit disconnect
      // Just clear local state
      break;
  }
};

/**
 * Check if provider is installed
 */
export const isProviderInstalled = (provider: WalletProvider): boolean => {
  switch (provider) {
    case 'MetaMask':
    case 'Trust Wallet':
    case 'Coinbase Wallet':
      return !!window.ethereum;
    case 'Phantom':
      return !!window.solana?.isPhantom;
    case 'WalletConnect':
      return true; // WalletConnect doesn't require installation
    default:
      return false;
  }
};

/**
 * Get provider icon/logo
 */
export const getProviderLogo = (provider: WalletProvider): string => {
  const logos = {
    'MetaMask': '🦊',
    'Trust Wallet': '🛡️',
    'Phantom': '👻',
    'Coinbase Wallet': '🔷',
    'WalletConnect': '🔗',
  };
  return logos[provider] || '💼';
};
