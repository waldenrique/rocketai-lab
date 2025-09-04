// Script para resetar senha de usuário admin
require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function resetAdminPassword() {
  console.log('🔄 Resetando senha do usuário admin...\n')
  
  // Configurar aqui o email e nova senha
  const adminEmail = 'waldenriquept@gmail.com'  // Altere se necessário
  const newPassword = 'rocketai85'  // Altere se necessário
  
  try {
    // Buscar o usuário pelo email
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    const user = authUsers.users.find(u => u.email === adminEmail)
    
    if (!user) {
      console.error(`❌ Usuário com email ${adminEmail} não encontrado!`)
      return
    }
    
    // Atualizar a senha
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    )
    
    if (error) {
      console.error('❌ Erro ao resetar senha:', error)
      return
    }
    
    console.log('✅ Senha resetada com sucesso!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Email: ${adminEmail}`)
    console.log(`🔒 Nova senha: ${newPassword}`)
    console.log('🌐 Acesse: /admin/login')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

resetAdminPassword()
