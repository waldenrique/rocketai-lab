// Configurações da aplicação
export const config = {
  // Credenciais (usa env vars ou fallback para dev)
  admin: {
    username: process.env.ADMIN_USERNAME || 'waldenrique',
    password: process.env.ADMIN_PASSWORD || 'rocketai85',
  },
  
  // Configurações de sessão
  session: {
    durationHours: parseInt(process.env.SESSION_DURATION_HOURS || '24'),
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key',
  },
  
  // Configurações de API
  api: {
    rateLimit: parseInt(process.env.API_RATE_LIMIT || '100'),
  },
  
  // Ambiente
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validar configurações críticas em produção
if (config.isProduction) {
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️ JWT_SECRET não configurado em produção!');
  }
  
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('⚠️ ADMIN_PASSWORD não configurado em produção!');
  }
}
