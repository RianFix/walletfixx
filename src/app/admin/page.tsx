'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Wallet, Activity, Shield, Lock, Eye, UserX } from 'lucide-react'

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stats = {
    totalUsers: 1547,
    activeUsers: 1234,
    suspendedUsers: 23,
    totalWallets: 3894,
    chainDistribution: { BTC: 1200, ETH: 1500, BSC: 800, TRX: 394 },
  }

  const recentUsers = [
    { id: 1, email: 'user@example.com', status: 'active', wallets: 3, joined: '2024-01-04' },
    { id: 2, email: 'demo@walletfix.io', status: 'active', wallets: 5, joined: '2024-01-03' },
    { id: 3, email: 'test@crypto.com', status: 'suspended', wallets: 2, joined: '2024-01-02' },
  ]

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="border-b border-red-500/20 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-500" />
                <div>
                  <span className="text-xl font-bold text-red-500">Admin Panel</span>
                  <div className="text-xs text-gray-400">WalletFix</div>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  className={`${activeTab === 'overview' ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors font-medium`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`${activeTab === 'users' ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                  onClick={() => setActiveTab('users')}
                >
                  Users
                </button>
                <button 
                  className={`${activeTab === 'wallets' ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                  onClick={() => setActiveTab('wallets')}
                >
                  Wallets
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                Exit Admin
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Admin Warning */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card p-4 border-l-4 border-red-500"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-500 mb-1">Admin Access</h3>
              <p className="text-sm text-gray-400">
                All actions are logged. Read-only access to public data. Private keys never visible.
              </p>
            </div>
          </div>
        </motion.div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Total Users</span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalUsers}</div>
                <div className="text-sm text-green-500">+24 this week</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Active Users</span>
                  <Activity className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.activeUsers}</div>
                <div className="text-sm text-gray-400">79.8% of total</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Total Wallets</span>
                  <Wallet className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalWallets}</div>
                <div className="text-sm text-green-500">+156 today</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Suspended</span>
                  <Shield className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stats.suspendedUsers}</div>
                <div className="text-sm text-gray-400">Need review</div>
              </motion.div>
            </div>

            {/* Chain Distribution */}
            <div className="glass-card p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Chain Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.chainDistribution).map(([chain, count], i) => (
                  <motion.div
                    key={chain}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-4 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/10"
                  >
                    <div className="text-2xl font-bold mb-2">{count}</div>
                    <div className="text-sm text-gray-400">{chain} Wallets</div>
                    <div className="mt-2 h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${(count / stats.totalWallets) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Users</h2>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium mb-1">{user.email}</div>
                        <div className="text-sm text-gray-400">
                          {user.wallets} wallets • Joined {user.joined}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`status-dot ${user.status === 'active' ? 'status-active' : 'status-suspended'}`} />
                        <span className="text-xs text-gray-400 capitalize">{user.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Wallets</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-purple-500/10 hover:bg-[#1a1a2e]/30 transition-colors">
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          <span className={`status-dot ${user.status === 'active' ? 'status-active' : 'status-suspended'}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.wallets}</td>
                      <td className="py-3 px-4 text-gray-400">{user.joined}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500">
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'wallets' && (
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Wallet Monitoring</h2>
            <p className="text-gray-400 mb-6">Read-only access to wallet addresses. Private keys never accessible.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.chainDistribution).map(([chain, count]) => (
                <div key={chain} className="p-4 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/10">
                  <div className="text-2xl font-bold mb-2">{count}</div>
                  <div className="text-sm text-gray-400">{chain} Addresses</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
