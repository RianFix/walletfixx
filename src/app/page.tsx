'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" 
             style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" 
             style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="text-4xl">💼</div>
            <span className="text-2xl font-bold gradient-text">WalletFix</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/dashboard">
              <button className="px-6 py-2 rounded-lg bg-transparent border border-purple-500/30 hover:border-purple-500/60 transition-all">
                Dashboard
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-primary">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Your Crypto,
            <br />
            <span className="gradient-text">Your Control</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Generate, connect, and manage crypto wallets across multiple chains. 
            100% non-custodial. Your keys, your coins.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/dashboard">
              <button className="btn-primary text-lg px-8 py-4">
                Launch App
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Supported Chains', value: '5+' },
              { label: 'Wallet Providers', value: '5' },
              { label: 'Security First', value: '100%' },
              { label: 'Transaction Fee', value: '$0' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="gradient-text">Powerful Features</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🔐', title: 'Non-Custodial', description: 'Your private keys never leave your device.' },
            { icon: '🌐', title: 'Multi-Chain', description: 'Support for Bitcoin, Ethereum, BSC, Tron, and more.' },
            { icon: '🔗', title: 'Connect Wallets', description: 'Connect MetaMask, Trust Wallet, Phantom, and more.' },
            { icon: '📊', title: 'Real-Time Data', description: 'Live price charts and market data.' },
            { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for instant wallet generation.' },
            { icon: '🛡️', title: 'Bank-Level Security', description: 'End-to-end encryption and protection.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 card-hover"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands managing their crypto assets securely with WalletFix.
          </p>
          <Link href="/dashboard">
            <button className="btn-primary text-lg px-10 py-4">
              Start Now - It&apos;s Free
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💼</div>
              <span className="text-xl font-bold gradient-text">WalletFix</span>
            </div>
            
            <div className="text-center text-gray-400 text-sm max-w-2xl">
              <p className="mb-2">
                <strong>DISCLAIMER:</strong> WalletFix does not store private keys or seed phrases.
              </p>
              <p>© 2024 WalletFix. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
