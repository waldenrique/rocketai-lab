require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkUserMetadata() {
  console.log('🔍 Verificando metadados dos usuários...\n');
  
  // Service role para ver dados completos
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  try {
    // Listar usuários do auth
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Erro ao listar usuários:', error);
      return;
    }
    
    console.log('👥 Usuários encontrados:', users.length);
    
    users.forEach((user, index) => {
      console.log(`\n📧 Usuário ${index + 1}:`);
      console.log('🔑 ID:', user.id);
      console.log('📧 Email:', user.email);
      console.log('📋 Metadados brutos:', JSON.stringify(user.user_metadata, null, 2));
      console.log('📋 App metadados:', JSON.stringify(user.app_metadata, null, 2));
      console.log('──────────────────────────────────────');
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

checkUserMetadata();
