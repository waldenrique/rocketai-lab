require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testWithAnonKey() {
  console.log('🧪 Testando acesso com chave anônima após login...\n');
  
  // Criar cliente com chave anônima (como no frontend)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const email = 'waldenriquept@gmail.com';
  const password = 'rocketai85';
  
  try {
    // 1. Fazer login
    console.log('🔐 1. Fazendo login com chave anônima...');
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (signInError) {
      console.error('❌ Erro no login:', signInError);
      return;
    }
    
    console.log('✅ Login realizado!');
    console.log('👤 User ID:', authData.user?.id);
    
    // 2. Tentar acessar dados da tabela users
    console.log('\n👥 2. Tentando acessar tabela users...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id);
      
    console.log('📊 Resultado:', { userData, userError });
    
    // 3. Verificar sessão atual
    console.log('\n🔍 3. Verificando sessão...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log('📋 Sessão:', sessionData.session?.user?.id);
    console.log('🔑 Token presente:', !!sessionData.session?.access_token);
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testWithAnonKey();
