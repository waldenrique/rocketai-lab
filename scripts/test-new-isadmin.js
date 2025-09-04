require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testNewIsAdmin() {
  console.log('🧪 Testando novo método isAdmin()...\n');
  
  // Cliente anônimo como no frontend
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const email = 'waldenriquept@gmail.com';
  const password = 'rocketai85';
  
  try {
    // 1. Login
    console.log('🔐 1. Fazendo login...');
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
    
    // 2. Verificar usuário atual
    console.log('\n👤 2. Verificando usuário atual...');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('❌ Erro ao obter usuário:', userError);
      return;
    }
    
    console.log('✅ Usuário obtido:', userData.user?.id);
    console.log('📋 Metadados:', JSON.stringify(userData.user?.user_metadata, null, 2));
    
    // 3. Verificar role nos metadados
    console.log('\n👑 3. Verificando role nos metadados...');
    const role = userData.user?.user_metadata?.role;
    console.log('🔍 Role encontrada:', role);
    console.log('✅ É admin?', role === 'admin');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testNewIsAdmin();
