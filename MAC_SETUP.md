# 🍎 INSTRUÇÕES PARA CONTINUAR NO MAC (TRABALHO)

## 📅 Última sessão: 03/09/2025 (Windows/Casa) ✅
## 🎯 Próxima sessão: 04/09/2025 (Mac/Trabalho) ⚠️

---

## 🚀 QUICK START NO MAC

### 1. **Clonar o repositório:**
```bash
cd ~/Desktop  # ou onde preferir
git clone https://github.com/waldenrique/rocketai-lab.git
cd rocketai-lab
```

### 2. **Instalar dependências:**
```bash
npm install
```

### 3. **Configurar ambiente:**
```bash
# Copiar as credenciais do Supabase
cp .env.local.example .env.local  # se existir
# OU criar novo .env.local com as credenciais
```

### 4. **Configurar credenciais Supabase:**
```bash
# Criar arquivo .env.local com suas credenciais privadas
# NUNCA COMMITADAS NO GIT POR SEGURANÇA

# ✅ SUPABASE - Pegar do seu dashboard Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[SEU-PROJETO].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[SUA-CHAVE-PUBLICA]
SUPABASE_SERVICE_ROLE_KEY=[SUA-CHAVE-PRIVADA]

# ⚠️ STRIPE - Configurar na próxima sessão
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
STRIPE_SECRET_KEY=your-stripe-secret-key-here
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret-here

# ✅ N8N - Configurar conforme necessário
N8N_WEBHOOK_SECRET=[SEU-WEBHOOK-SECRET]
N8N_WEBHOOK_URL=[SUA-URL-N8N]
```

**⚠️ IMPORTANTE:** Pegue as credenciais reais do seu:
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Projeto atual:** xncepkqptgyuwozbhvyh (use este ID para encontrar)

### 5. **Iniciar desenvolvimento:**
```bash
npm run dev
```

### 6. **Testar se funcionou:**
- Acessar: http://localhost:3000
- Testar blog: http://localhost:3000/blog
- Verificar DB: `npm run test-db`

---

## 📊 STATUS ATUAL

### ✅ **O QUE ESTÁ FUNCIONANDO:**
- **Blog completo** - 3 posts migrados
- **Supabase conectado** - Banco operacional
- **APIs funcionais** - /api/blog operando
- **Interface responsiva** - Design completo

### ⚠️ **PRÓXIMOS PASSOS (FASE 2):**
1. **Configurar Stripe:**
   - Obter credenciais de teste
   - Configurar no .env.local
   - Testar checkout

2. **Testar e-commerce:**
   - Página produtos: http://localhost:3000/produtos
   - Fluxo de compra completo

---

## 🔗 LINKS IMPORTANTES

### **URLs funcionais:**
- **Homepage:** http://localhost:3000
- **Blog:** http://localhost:3000/blog
- **Posts:**
  - http://localhost:3000/blog/por-que-sua-empresa-precisa-de-presenca-digital-em-2025
  - http://localhost:3000/blog/automacao-de-marketing-como-acelerar-vendas
  - http://localhost:3000/blog/redes-sociais-estrategias-que-geram-resultados

### **GitHub:** https://github.com/waldenrique/rocketai-lab

### **Supabase Dashboard:** https://supabase.com/dashboard/project/xncepkqptgyuwozbhvyh

---

## 🛠️ COMANDOS ÚTEIS

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor

# Database
npm run test-db         # Testar conexão Supabase
npm run list-posts      # Ver posts no banco

# Git
git status              # Ver mudanças
git add .               # Adicionar arquivos
git commit -m "msg"     # Fazer commit
git push origin main    # Enviar para GitHub
```

---

## 📚 DOCUMENTAÇÃO

### **Ler primeiro:**
1. `PROJECT_SUMMARY.md` - Resumo técnico completo
2. `README_DEV.md` - Guia de desenvolvimento

### **Arquivos importantes:**
- `/lib/blog.utils.ts` - Funções do blog (funcionando)
- `/app/api/blog/` - APIs do blog (funcionando)
- `/app/produtos/page.tsx` - E-commerce (aguarda Stripe)

---

## 🎯 OBJETIVO DA PRÓXIMA SESSÃO

**IMPLEMENTAR FASE 2 - STRIPE E-COMMERCE:**

1. ✅ Testar se ambiente Mac funciona
2. ⚠️ Configurar credenciais Stripe  
3. ⚠️ Testar sistema de pagamentos
4. ⚠️ Implementar downloads digitais
5. ⚠️ Configurar webhooks Stripe

---

## 💡 DICAS IMPORTANTES

- **Tudo foi testado** no Windows e está funcionando
- **3 posts migrados** com sucesso para Supabase
- **URLs dos posts** usam slugs completos (ver lista acima)
- **Stripe** só precisa das credenciais para funcionar
- **Backup completo** no GitHub

---

**🚀 PRONTO PARA CONTINUAR NO MAC! Tudo sincronizado no GitHub.**
