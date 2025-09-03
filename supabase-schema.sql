-- ============================================================================
-- SUPABASE DATABASE SCHEMA - ROCKET AI LAB
-- Status: ✅ EXECUTADO COM SUCESSO (03/09/2025)
-- 
-- Tabelas criadas e funcionais:
-- - posts: 3 posts migrados ✅
-- - products: Estrutura pronta para Fase 2 ⚠️
-- - orders: Pronto para integração Stripe ⚠️
-- - users: Configurado para autenticação ⚠️
-- - product_files: Sistema de arquivos digitais ⚠️
-- 
-- RLS (Row Level Security): Ativo
-- Triggers: Funcionando
-- Índices: Criados para performance
-- ============================================================================

-- Criação das tabelas para o projeto Rocket Lab

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de posts (migração do sistema atual)
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL DEFAULT 'Rocket Lab Marketing',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 5,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  seo_og_title TEXT,
  seo_og_description TEXT,
  seo_og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de produtos digitais
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  type TEXT NOT NULL CHECK (type IN ('pdf', 'spreadsheet', 'json', 'video_access', 'bundle')),
  stripe_product_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  thumbnail TEXT,
  preview_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  download_limit INTEGER,
  access_duration_days INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de arquivos dos produtos
CREATE TABLE product_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  access_url TEXT, -- Para vídeos ou links externos
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de pedidos/vendas
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  product_id UUID REFERENCES products(id),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  download_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de usuários (para admin e clientes)
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_product_files_product_id ON product_files(product_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stripe_session ON orders(stripe_session_id);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - configurar depois da autenticação
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (serão refinadas depois)
-- Posts: todos podem ler posts publicados
CREATE POLICY "Anyone can read published posts" ON posts
  FOR SELECT USING (published = true);

-- Products: todos podem ler produtos ativos
CREATE POLICY "Anyone can read active products" ON products
  FOR SELECT USING (active = true);

-- Orders: usuários só podem ver seus próprios pedidos
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (customer_email = auth.email());

-- Admin pode fazer tudo (será configurado depois)
CREATE POLICY "Admins can do everything on posts" ON posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can do everything on products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can do everything on orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
