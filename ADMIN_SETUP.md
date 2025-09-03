# 🔐 CONFIGURAÇÃO SEGURA DO ADMIN

## ⚠️ IMPORTANTE - SEGURANÇA

**NUNCA** coloque credenciais reais no código que vai para o GitHub!

## 🛠️ Como Configurar o Admin

### 1. Editar o Script Localmente

Abra o arquivo `scripts/create-admin.js` e altere as credenciais:

```javascript
// Altere estas linhas (APENAS LOCALMENTE):
const adminEmail = 'seu-email@exemplo.com'
const temporaryPassword = 'SuaSenhaSegura123!'
```

### 2. Executar o Script

```bash
node scripts/create-admin.js
```

### 3. Fazer Login

- Acesse `/admin/login`
- Use o email e senha que você configurou
- **IMEDIATAMENTE** altere a senha após o primeiro login

## 🔒 Boas Práticas

1. **Email**: Use um email real que você controla
2. **Senha Temporária**: Use algo seguro mas que você mudará
3. **Primeira Ação**: Alterar a senha no painel admin
4. **Git**: Nunca commit as credenciais reais

## 📁 Arquivos que NÃO devem ter credenciais reais:

- `scripts/create-admin.js` (use apenas para setup local)
- `app/admin/login/page.tsx` (só exemplos genéricos)
- Qualquer arquivo que vai para o GitHub

## ✅ Sistema Seguro

- ✅ Credenciais armazenadas no Supabase Auth
- ✅ Verificação de role de admin
- ✅ Sessões seguras
- ✅ Possibilidade de alterar senha
- ✅ Nenhuma credencial hardcoded no frontend

## 🚀 Para Produção

1. Configure as credenciais usando o script
2. Faça o primeiro login
3. Altere a senha imediatamente
4. Delete/resete o script se necessário
