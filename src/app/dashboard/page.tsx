'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wallet, TrendingUp, Activity, Shield, Plus, Copy, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const mockWallets = [
    { chain: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', balance: 0.5, usdValue: 25000 },
    { chain: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', balance: 5.2, usdValue: 15000 },
    { chain: 'BSC', address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3', balance: 150, usdValue: 45000 },
  ]

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
                <button className="text-white font-medium">Dashboard</button>
                <Link href="/wallets" className="text-gray-400 hover:text-white transition-colors">Wallets</Link>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors">
                <Shield className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Security Warning */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card p-4 border-l-4 border-yellow-500"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-500 mb-1">Backup Your Keys</h3>
              <p className="text-sm text-gray-400">
                Make sure you&apos;ve backed up your private keys and seed phrases.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Value</span>
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mb-1">$85,000</div>
            <div className="text-sm text-green-500">+12.5% this week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Wallets</span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">3</div>
            <div className="text-sm text-gray-400">Across 3 chains</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">24h Change</span>
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1 text-green-500">+8.2%</div>
            <div className="text-sm text-gray-400">+$6,234</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href="/wallets" className="flex items-center justify-center h-full">
              <div className="text-center">
                <Plus className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <div className="font-semibold">Add Wallet</div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallets List */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Wallets</h2>
                <Link href="/wallets" className="text-purple-500 hover:text-purple-400 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {mockWallets.map((wallet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-4 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/10 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                          {wallet.chain}
                        </div>
                        <div>
                          <div className="font-semibold mb-1">{wallet.chain} Wallet</div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                            <button className="hover:text-purple-500 transition-colors">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${wallet.usdValue.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{wallet.balance} {wallet.chain}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {[
                  { type: 'Received', amount: '+0.05 BTC', time: '2 hours ago' },
                  { type: 'Sent', amount: '-1.2 ETH', time: '5 hours ago' },
                  { type: 'Connected', amount: 'MetaMask', time: '1 day ago' },
                ].map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a2e]/30"
                  >
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                    <div className="font-mono text-sm">{activity.amount}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
