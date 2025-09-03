# 🚀 Guia de Deploy na Vercel

## 📋 **Configuração de Variáveis de Ambiente**

### 1. **Acessar o Dashboard da Vercel**
- Vá para [vercel.com](https://vercel.com)
- Acesse seu projeto: `rocketai-lab`
- Clique em **Settings** → **Environment Variables**

### 2. **Adicionar Variáveis de Ambiente**

Adicione as seguintes variáveis:

```bash
# Autenticação Admin
ADMIN_USERNAME=seu_usuario
ADMIN_PASSWORD=sua_senha_segura

# Configurações de Segurança  
JWT_SECRET=sua_chave_secreta_256_bits_aleatoria
SESSION_DURATION_HOURS=24

# Configurações de API
API_RATE_LIMIT=100
NODE_ENV=production
```

### 3. **Como Adicionar Cada Variável:**

1. **Name**: `ADMIN_USERNAME`
   **Value**: `[seu_usuario]`
   **Environment**: `Production`, `Preview`, `Development`

2. **Name**: `ADMIN_PASSWORD` 
   **Value**: `[sua_senha_segura]`
   **Environment**: `Production`, `Preview`, `Development`

3. **Name**: `JWT_SECRET`
   **Value**: `[chave_256_bits_aleatoria]`
   **Environment**: `Production`, `Preview`, `Development`

4. **Name**: `SESSION_DURATION_HOURS`
   **Value**: `24`
   **Environment**: `Production`, `Preview`, `Development`

### 4. **Verificar Deploy**
- Após adicionar as variáveis, faça um novo deploy
- Ou vá em **Deployments** → **Redeploy**

---

## 🔧 **Comandos Vercel CLI (Opcional)**

Se preferir usar CLI:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Configurar variáveis via CLI
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET

# Deploy manual
vercel --prod
```

---

## ✅ **Checklist de Deploy**

- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `.env` files no `.gitignore`
- [ ] Deploy realizado com sucesso
- [ ] Login funcionando em produção
- [ ] APIs protegidas funcionando

---

## 🚨 **IMPORTANTE:**

1. **NÃO** commite arquivos `.env` para o Git
2. **SIM** configure as variáveis diretamente na Vercel
3. **SIM** use senhas diferentes em produção
4. **SIM** gere uma JWT_SECRET segura

---

**URL do Projeto**: https://rocketai-lab.vercel.app
**Admin**: https://rocketai-lab.vercel.app/login
