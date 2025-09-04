require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Usando service role para ver todos os dados
);

async function checkTables() {
  console.log('🔍 Verificando estrutura de dados...\n');
  
  const userId = '716f5ace-eae2-430c-80c3-3bc666df0539';
  
  // 1. Verificar tabela users
  console.log('👥 1. Verificando tabela users...');
  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId);
    
  console.log('Users data:', usersData);
  console.log('Users error:', usersError);
  
  // 2. Verificar tabela profiles (se existir)
  console.log('\n👤 2. Verificando tabela profiles...');
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);
    
  console.log('Profiles data:', profilesData);
  console.log('Profiles error:', profilesError);
  
  // 3. Verificar todas as tabelas disponíveis
  console.log('\n📋 3. Listando todas as tabelas users...');
  const { data: allUsers, error: allUsersError } = await supabase
    .from('users')
    .select('*');
    
  console.log('All users:', allUsers);
  console.log('All users error:', allUsersError);
}

checkTables();
