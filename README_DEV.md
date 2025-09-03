# 🚀 ROCKET AI LAB - GUIA DE DESENVOLVIMENTO

## 🎯 STATUS ATUAL (03/09/2025)
**✅ FASE 1 CONCLUÍDA** - Blog funcionando 100% com Supabase  
**⚠️ FASE 2 PENDENTE** - E-commerce aguardando Stripe  
**⚠️ FASE 3 PENDENTE** - Automação n8n + IA  

---

## 🚀 QUICK START

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar desenvolvimento
npm run dev

# 3. Acessar aplicação
# http://localhost:3000
```

---

## 📋 COMANDOS DISPONÍVEIS

```bash
# Desenvolvimento
npm run dev              # Inicia servidor (http://localhost:3000)
npm run build           # Build para produção
npm run start           # Servidor produção

# Database Scripts
npm run test-db         # Testa conexão Supabase ✅
npm run list-posts      # Lista posts do banco ✅
npm run migrate-posts   # Migra posts (já executado) ✅
```

---

## 🔗 URLS FUNCIONAIS

### **✅ Funcionando:**
- **Homepage:** http://localhost:3000
- **Blog:** http://localhost:3000/blog
- **Post 1:** http://localhost:3000/blog/por-que-sua-empresa-precisa-de-presenca-digital-em-2025
- **Post 2:** http://localhost:3000/blog/automacao-de-marketing-como-acelerar-vendas
- **Post 3:** http://localhost:3000/blog/redes-sociais-estrategias-que-geram-resultados

### **⚠️ Interface pronta, funcionalidade pendente:**
- **Produtos:** http://localhost:3000/produtos (aguarda Stripe)
- **Auth:** http://localhost:3000/auth (aguarda configuração)

---

## 🛠️ PRÓXIMA SESSÃO DE DESENVOLVIMENTO

### **FASE 2 - STRIPE E-COMMERCE:**

1. **Obter credenciais Stripe:**
   - Publishable Key
   - Secret Key
   - Webhook Secret

2. **Configurar .env.local:**
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Testar sistema:**
   ```bash
   npm run dev
   # Acessar http://localhost:3000/produtos
   ```

### **FASE 3 - N8N AUTOMATION:**
- Integração com n8n (configuração pronta)
- Sistema de posts automáticos via IA
- Webhooks funcionais

---

## 📊 BANCO DE DADOS

### **Status:** ✅ Supabase conectado e funcionando

### **Dados atuais:**
- **3 Posts migrados** com sucesso
- **Tabelas criadas:** posts, products, orders, users, product_files
- **APIs funcionais:** /api/blog operacional

### **Verificação rápida:**
```bash
npm run test-db    # Deve retornar ✅ conexão funcionando
npm run list-posts # Mostra os 3 posts migrados
```

---

## 🐛 TROUBLESHOOTING

### **Se o blog não carregar:**
1. Verificar se Supabase está conectado: `npm run test-db`
2. Verificar se há posts: `npm run list-posts`
3. Reiniciar servidor: Ctrl+C e `npm run dev`

### **Se APIs retornarem erro:**
- Verificar .env.local com credenciais Supabase
- Verificar se schema SQL foi executado no dashboard

### **URLs dos posts:**
- Usar sempre os slugs completos listados em `npm run list-posts`
- Não usar URLs encurtadas

---

## 📁 ESTRUTURA IMPORTANTE

```
rocketai-lab/
├── app/
│   ├── blog/           # ✅ Blog funcionando
│   ├── produtos/       # ⚠️ Aguarda Stripe
│   └── api/
│       ├── blog/       # ✅ APIs funcionais
│       └── stripe/     # ⚠️ Aguarda configuração
├── lib/
│   ├── supabase.ts    # ✅ Conexão funcionando
│   └── blog.utils.ts  # ✅ CRUD completo
├── scripts/           # ✅ Utilitários prontos
└── .env.local        # ⚠️ Stripe pendente
```

---

## 💡 LEMBRETES IMPORTANTES

1. **Server sempre em:** http://localhost:3000
2. **Supabase URL:** https://xncepkqptgyuwozbhvyh.supabase.co
3. **Posts funcionais:** 3 migrados com slugs corretos
4. **Próximo passo:** Configurar Stripe para e-commerce
5. **Backup do projeto:** Disponível no GitHub

---

**🎯 OBJETIVO:** Continuar da Fase 2 (Stripe) quando as credenciais estiverem prontas!
