require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role para criar políticas
);

async function setupRLS() {
  console.log('🛡️ Configurando políticas RLS para tabela users...\n');
  
  try {
    // 1. Habilitar RLS na tabela users
    console.log('🔒 1. Habilitando RLS...');
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      query: 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;'
    });
    
    if (rlsError) {
      console.log('⚠️ RLS já pode estar habilitado:', rlsError.message);
    } else {
      console.log('✅ RLS habilitado');
    }
    
    // 2. Criar política para usuários verem seus próprios dados
    console.log('\n👤 2. Criando política para usuários autenticados...');
    const { error: policyError } = await supabase.rpc('exec_sql', {
      query: `
        CREATE POLICY "Users can view their own data" 
        ON public.users 
        FOR SELECT 
        USING (auth.uid() = id);
      `
    });
    
    if (policyError) {
      console.log('⚠️ Política já pode existir:', policyError.message);
    } else {
      console.log('✅ Política criada');
    }
    
    // 3. Criar política para admins verem todos os dados
    console.log('\n👑 3. Criando política para admins...');
    const { error: adminPolicyError } = await supabase.rpc('exec_sql', {
      query: `
        CREATE POLICY "Admins can view all users" 
        ON public.users 
        FOR ALL 
        USING (
          EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
          )
        );
      `
    });
    
    if (adminPolicyError) {
      console.log('⚠️ Política admin já pode existir:', adminPolicyError.message);
    } else {
      console.log('✅ Política admin criada');
    }
    
    console.log('\n🎉 Configuração de segurança concluída!');
    
  } catch (error) {
    console.error('❌ Erro ao configurar RLS:', error);
  }
}

setupRLS();
