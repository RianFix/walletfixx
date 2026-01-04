import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';

export type ChainType = 'BTC' | 'ETH' | 'BSC' | 'TRX';

export interface WalletData {
  address: string;
  privateKey: string;
  mnemonic?: string;
  chain: ChainType;
}

/**
 * Generate Ethereum/BSC wallet (same format)
 * Client-side only - never send private key to server
 */
export const generateEVMWallet = async (chain: 'ETH' | 'BSC'): Promise<WalletData> => {
  const wallet = ethers.Wallet.createRandom();
  
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase,
    chain,
  };
};

/**
 * Generate Bitcoin wallet
 * Client-side only - never send private key to server
 */
export const generateBTCWallet = async (): Promise<WalletData> => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ 
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.bitcoin 
  });
  
  return {
    address: address!,
    privateKey: keyPair.toWIF(),
    chain: 'BTC',
  };
};

/**
 * Generate Tron wallet
 * Client-side only - never send private key to server
 */
export const generateTRXWallet = async (): Promise<WalletData> => {
  // Using ethers for key generation (Tron uses similar keys)
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey.slice(2); // Remove 0x prefix
  
  // Simplified Tron address generation
  // In production, use tronweb properly
  const tronAddress = 'T' + wallet.address.slice(2, 36);
  
  return {
    address: tronAddress,
    privateKey: privateKey,
    chain: 'TRX',
  };
};

/**
 * Main wallet generation function
 */
export const generateWallet = async (chain: ChainType): Promise<WalletData> => {
  switch (chain) {
    case 'ETH':
    case 'BSC':
      return generateEVMWallet(chain);
    case 'BTC':
      return generateBTCWallet();
    case 'TRX':
      return generateTRXWallet();
    default:
      throw new Error('Unsupported chain');
  }
};

/**
 * Encrypt private key for local storage
 * Uses Web Crypto API for encryption
 */
export const encryptPrivateKey = async (privateKey: string, password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(privateKey);
  
  // Generate key from password
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // Derive encryption key
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('walletfix-salt'), // In production, use random salt
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  // Encrypt
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  // Combine iv and encrypted data
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  // Convert to base64
  return btoa(String.fromCharCode(...combined));
};

/**
 * Decrypt private key from local storage
 */
export const decryptPrivateKey = async (encryptedData: string, password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  // Decode from base64
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);
  
  // Generate key from password
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // Derive decryption key
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('walletfix-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  
  // Decrypt
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );
  
  return decoder.decode(decrypted);
};

/**
 * Store encrypted wallet in IndexedDB
 */
export const storeWalletLocally = async (wallet: WalletData, password: string): Promise<void> => {
  const encryptedPrivateKey = await encryptPrivateKey(wallet.privateKey, password);
  
  const walletInfo = {
    address: wallet.address,
    chain: wallet.chain,
    encryptedPrivateKey,
    createdAt: Date.now(),
  };
  
  // Store in localStorage (in production, use IndexedDB)
  const storedWallets = JSON.parse(localStorage.getItem('walletfix_wallets') || '[]');
  storedWallets.push(walletInfo);
  localStorage.setItem('walletfix_wallets', JSON.stringify(storedWallets));
};

/**
 * Get stored wallets (addresses only, no private keys)
 */
export const getStoredWallets = (): Array<{address: string; chain: ChainType}> => {
  const stored = localStorage.getItem('walletfix_wallets');
  if (!stored) return [];
  
  return JSON.parse(stored).map((w: any) => ({
    address: w.address,
    chain: w.chain,
  }));
};

/**
 * Validate Ethereum/BSC address
 */
export const isValidEVMAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

/**
 * Validate Bitcoin address
 */
export const isValidBTCAddress = (address: string): boolean => {
  try {
    bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format address for display (0x1234...5678)
 */
export const formatAddress = (address: string, length: number = 6): string => {
  if (address.length < length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
