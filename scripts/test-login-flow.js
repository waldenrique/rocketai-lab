require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testLoginFlow() {
  console.log('🧪 Testando fluxo completo de login...\n');
  
  const email = 'waldenriquept@gmail.com';
  const password = 'rocketai85';
  
  try {
    // 1. Login
    console.log('🔐 1. Fazendo login...');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (signInError) {
      console.error('❌ Erro no signIn:', signInError);
      return;
    }
    
    console.log('✅ Login realizado!');
    console.log('👤 User ID:', data.user?.id);
    console.log('📧 Email:', data.user?.email);
    
    // 2. Aguardar sessão se estabelecer
    console.log('\n⏳ 2. Aguardando sessão...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 3. Verificar usuário atual
    console.log('\n👤 3. Verificando usuário atual...');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('❌ Erro ao obter usuário:', userError);
      return;
    }
    
    console.log('✅ Usuário obtido:', userData.user?.id);
    
    // 4. Buscar role na tabela users
    console.log('\n👑 4. Buscando role na tabela users...');
    const { data: roleData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userData.user.id)
      .single();
      
    console.log('📊 Resultado da consulta:', { roleData, roleError });
    
    if (roleError) {
      console.error('❌ Erro ao buscar role:', roleError);
      return;
    }
    
    if (!roleData) {
      console.log('❌ Nenhum dado encontrado');
      return;
    }
    
    console.log('✅ Role encontrada:', roleData.role);
    console.log('👑 É admin?', roleData.role === 'admin');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testLoginFlow();
