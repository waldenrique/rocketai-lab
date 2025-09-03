# 🚀 Configuração do Supabase - Rocket Lab

## 📋 Passos para configuração

### 1. Configure as variáveis de ambiente

Edite o arquivo `.env.local` e preencha com suas credenciais:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Execute o schema SQL no Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor**
3. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
4. Execute o script para criar todas as tabelas

### 3. Migre os posts existentes

Após configurar as variáveis de ambiente, execute:

```bash
npx ts-node scripts/migrate-posts.ts
```

### 4. Configure a autenticação

1. No Supabase Dashboard, vá em **Authentication > Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (desenvolvimento)
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

### 5. Configure as políticas RLS (Row Level Security)

As políticas básicas já estão no schema, mas você pode refiná-las:

- **Posts**: Todos podem ler posts publicados, apenas admins podem editar
- **Products**: Todos podem ler produtos ativos, apenas admins podem editar
- **Orders**: Usuários só veem seus próprios pedidos, admins veem tudo

## 🗂️ Estrutura das tabelas

### `posts`
- Sistema de blog completo com SEO
- Suporte a tags, categorias, rascunhos
- Campos SEO para meta tags e OpenGraph

### `products`
- Produtos digitais (PDF, planilhas, JSON, acesso a vídeos)
- Integração com Stripe
- Controle de download e acesso

### `product_files`
- Arquivos vinculados aos produtos
- URLs de download seguras
- Controle de arquivo principal

### `orders`
- Histórico de vendas
- Integração com Stripe
- Controle de downloads e expiração

### `users`
- Usuários do sistema (admin/customer)
- Integração com Supabase Auth

## 🔧 Funcionalidades implementadas

✅ **Sistema de Blog**
- CRUD completo de posts
- Paginação e busca
- SEO otimizado

✅ **E-commerce Base**
- Estrutura para produtos digitais
- Integração Stripe preparada
- Sistema de pedidos

✅ **Autenticação**
- Preparado para Supabase Auth
- Controle de roles (admin/customer)
- Políticas de segurança

## 📝 Próximos passos

1. **Stripe Integration** - Sistema de pagamento
2. **n8n Webhooks** - Automação de posts
3. **File Upload** - Upload de produtos
4. **Email System** - Confirmações e downloads

## 🚨 Importante

- Mantenha as chaves do Supabase seguras
- Use o Service Role Key apenas no server-side
- Configure CORS corretamente para produção
- Teste as políticas RLS antes de ir para produção
