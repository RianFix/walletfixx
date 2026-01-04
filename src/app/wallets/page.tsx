'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Wallet, Plus, Copy, Shield, AlertCircle, Check, X, QrCode } from 'lucide-react'

export default function WalletsPage() {
  const [mounted, setMounted] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedChain, setSelectedChain] = useState('ETH')
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const mockWallets = [
    { id: 1, chain: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'Main Bitcoin', balance: 0.5, usdValue: 25000 },
    { id: 2, chain: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', label: 'Trading', balance: 5.2, usdValue: 15000 },
    { id: 3, chain: 'BSC', address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3', label: 'DeFi', balance: 150, usdValue: 45000 },
  ]

  const chains = [
    { type: 'BTC', name: 'Bitcoin', icon: '₿' },
    { type: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { type: 'BSC', name: 'BNB Chain', icon: '🔶' },
    { type: 'TRX', name: 'Tron', icon: '◉' },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="text-3xl">💼</div>
                <span className="text-xl font-bold gradient-text">WalletFix</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <button className="text-white font-medium">Wallets</button>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</Link>
              </nav>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card p-6 border-l-4 border-yellow-500"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-500 mb-2 text-lg">Security Information</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Your private keys are generated and stored ONLY on your device</li>
                <li>• WalletFix never has access to your private keys</li>
                <li>• Always backup your keys immediately after generation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wallets</h1>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Generate Wallet
          </button>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWallets.map((wallet, i) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                    {wallet.chain}
                  </div>
                  <div>
                    <div className="font-bold">{wallet.label}</div>
                    <div className="text-xs text-gray-400">{wallet.chain}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-[#0a0a0f]/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Address</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-mono truncate">
                    {wallet.address.slice(0, 12)}...{wallet.address.slice(-10)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(wallet.address)}
                    className="p-1.5 hover:bg-purple-500/10 rounded transition-colors"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold mb-1">${wallet.usdValue.toLocaleString()}</div>
                <div className="text-sm text-gray-400">{wallet.balance} {wallet.chain}</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 px-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors text-sm font-medium">
                  Send
                </button>
                <button className="flex-1 py-2 px-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-sm font-medium">
                  Receive
                </button>
                <button className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors">
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate Wallet Modal */}
      <AnimatePresence>
        {showGenerateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowGenerateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generate New Wallet</h2>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Select Chain</label>
                <div className="grid grid-cols-2 gap-3">
                  {chains.map((chain) => (
                    <button
                      key={chain.type}
                      onClick={() => setSelectedChain(chain.type)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedChain === chain.type
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-purple-500/20 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="text-3xl mb-2">{chain.icon}</div>
                      <div className="font-medium">{chain.name}</div>
                      <div className="text-xs text-gray-400">{chain.type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert('Wallet generation demo - In production, this generates a real wallet client-side')}
                className="w-full btn-primary"
              >
                Generate {selectedChain} Wallet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
