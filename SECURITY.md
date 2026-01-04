# WalletFix Security Documentation

## 🔒 Security Architecture

### Core Security Principles

1. **Non-Custodial Design**
   - Private keys are NEVER transmitted to servers
   - Private keys are NEVER stored in databases
   - All key generation happens client-side
   - Zero-knowledge architecture

2. **Client-Side Encryption**
   - Web Crypto API for key generation
   - AES-256-GCM encryption for local storage
   - PBKDF2 key derivation (100,000 iterations)
   - Random IV generation for each encryption

3. **Server-Side Security**
   - Row Level Security (RLS) in Supabase
   - RBAC (Role-Based Access Control)
   - API rate limiting
   - SQL injection prevention
   - XSS protection
   - CSRF protection

## 🛡️ What We Store

### ✅ STORED (Server-side)
- User email addresses
- Public wallet addresses
- Chain types (BTC, ETH, etc.)
- User registration data
- Activity logs (non-sensitive)
- Session tokens (encrypted)

### ❌ NEVER STORED (Anywhere on server)
- Private keys
- Seed phrases / Mnemonic phrases
- Raw passwords
- Key derivation data
- Any data that could compromise wallets

## 🔐 Key Generation Process

### 1. Bitcoin (BTC)
\`\`\`typescript
// Client-side only
const keyPair = bitcoin.ECPair.makeRandom();
const { address } = bitcoin.payments.p2pkh({ 
  pubkey: keyPair.publicKey 
});
// Private key: keyPair.toWIF()
// Public address sent to server: address
\`\`\`

### 2. Ethereum/BSC (EVM)
\`\`\`typescript
// Client-side only
const wallet = ethers.Wallet.createRandom();
// Private key: wallet.privateKey
// Public address sent to server: wallet.address
\`\`\`

### 3. Tron (TRX)
\`\`\`typescript
// Client-side only
const tronWeb = new TronWeb();
const account = await tronWeb.createAccount();
// Private key: account.privateKey
// Public address sent to server: account.address.base58
\`\`\`

## 🔑 Local Storage Encryption

### Encryption Process
\`\`\`typescript
async function encryptPrivateKey(privateKey: string, password: string) {
  // 1. Derive key from password using PBKDF2
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // 2. Derive encryption key (100,000 iterations)
  const encryptionKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('walletfix-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  // 3. Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // 4. Encrypt using AES-256-GCM
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    encryptionKey,
    encoder.encode(privateKey)
  );
  
  // 5. Store IV + encrypted data
  return base64Encode(iv + encrypted);
}
\`\`\`

## 🗄️ Database Security

### Row Level Security (RLS) Policies

#### Users Table
\`\`\`sql
-- Users can only view their own data
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users cannot modify their own role
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM users WHERE id = auth.uid())
  );
\`\`\`

#### Wallets Table
\`\`\`sql
-- Users can only view their own wallets
CREATE POLICY "Users view own wallets"
  ON wallets FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own wallets
CREATE POLICY "Users insert own wallets"
  ON wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users cannot modify wallet addresses (immutable)
CREATE POLICY "Wallets are immutable"
  ON wallets FOR UPDATE
  USING (false);
\`\`\`

#### Admin Access
\`\`\`sql
-- Admins can view all data (except private keys which don't exist)
CREATE POLICY "Admins view all"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
\`\`\`

## 🌐 Network Security

### Content Security Policy (CSP)
\`\`\`
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://*.supabase.co https://api.coingecko.com;
\`\`\`

### Security Headers
\`\`\`
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
\`\`\`

## 🚫 Rate Limiting

### API Endpoints
- Authentication: 5 requests / minute
- Wallet creation: 10 / hour
- Market data: 100 / hour
- General API: 1000 / hour

### Implementation
\`\`\`typescript
const rateLimiter = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // max requests
  message: 'Too many requests',
};
\`\`\`

## 👤 Admin Security

### Admin Principles
1. **Least Privilege**: Admins only have access to necessary data
2. **Audit Logging**: All admin actions are logged
3. **No Private Data**: Admins NEVER see private keys or seeds
4. **Time-Limited Sessions**: Admin sessions expire after 30 minutes
5. **IP Whitelisting**: Optional IP restrictions for admin access

### Admin Capabilities
✅ **CAN DO:**
- View user email and registration data
- See public wallet addresses
- View activity logs
- Suspend/unsuspend accounts
- View system statistics
- Configure system settings

❌ **CANNOT DO:**
- View private keys (they don't exist on server)
- View seed phrases (they don't exist on server)
- Modify wallet addresses
- Access user funds
- Decrypt user data

### Admin Action Logging
\`\`\`sql
INSERT INTO admin_logs (
  admin_id,
  action,
  target_user_id,
  details,
  ip_address,
  user_agent
) VALUES (
  $1, $2, $3, $4, $5, $6
);
\`\`\`

## 🔍 Security Monitoring

### Automated Alerts
- Multiple failed login attempts
- Unusual wallet generation patterns
- Suspicious IP addresses
- Rate limit violations
- Database query anomalies

### Incident Response
1. Automatic account lockout after 5 failed logins
2. Admin notification for suspicious activity
3. Detailed logging for forensics
4. User notification for security events

## ⚠️ User Responsibilities

### What Users MUST Do
1. **Backup Private Keys**: Write down and store securely
2. **Backup Seed Phrases**: Keep in safe, offline location
3. **Use Strong Passwords**: Minimum 12 characters
4. **Enable 2FA**: If available
5. **Verify URLs**: Always check you're on the correct site
6. **Never Share Keys**: Never give private keys to anyone

### What WalletFix CANNOT Do
1. ❌ Recover lost private keys
2. ❌ Reset wallet passwords if private key is lost
3. ❌ Reverse transactions
4. ❌ Access your funds
5. ❌ Retrieve seed phrases

## 📋 Security Checklist

### Before Deployment
- [ ] All environment variables set securely
- [ ] RLS policies enabled on all tables
- [ ] CSP headers configured
- [ ] Rate limiting active
- [ ] HTTPS enforced
- [ ] Backup systems tested
- [ ] Monitoring alerts configured
- [ ] Admin access restricted
- [ ] Audit logging enabled
- [ ] Security headers verified

### Regular Maintenance
- [ ] Review access logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Security audit annually
- [ ] Penetration testing annually
- [ ] Review RLS policies quarterly
- [ ] Update CSP as needed

## 🆘 Security Issues

### Reporting Vulnerabilities
If you discover a security vulnerability, please email:
**security@walletfix.io**

**DO NOT** open public GitHub issues for security vulnerabilities.

### Bug Bounty Program
We appreciate security researchers who help keep WalletFix secure. Contact us for details about our bug bounty program.

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [Web Crypto API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Blockchain Security Guidelines](https://consensys.github.io/smart-contract-best-practices/)

---

**Last Updated**: January 2024
**Security Contact**: security@walletfix.io
