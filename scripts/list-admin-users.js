// Script para listar usuários admin no Supabase
require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function listAdminUsers() {
  console.log('🔍 Verificando usuários admin no Supabase...\n')
  
  try {
    // 1. Listar todos os usuários de auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error('❌ Erro ao buscar usuários de auth:', authError)
      return
    }
    
    console.log('🔐 Usuários de autenticação encontrados:', authUsers.users?.length || 0)
    
    if (authUsers.users && authUsers.users.length > 0) {
      for (const user of authUsers.users) {
        console.log(`\n📧 Email: ${user.email}`)
        console.log(`🔑 ID: ${user.id}`)
        console.log(`📅 Criado em: ${new Date(user.created_at).toLocaleString()}`)
        console.log(`✅ Confirmado: ${user.email_confirmed_at ? 'Sim' : 'Não'}`)
        
        // Verificar se tem role de admin na tabela users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (userData) {
          console.log(`👑 Role: ${userData.role}`)
        } else {
          console.log(`⚠️ Não encontrado na tabela users`)
        }
        
        console.log('─'.repeat(50))
      }
    }
    
    // 2. Listar usuários da tabela users com role admin
    const { data: adminUsers, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'admin')
    
    if (adminError) {
      console.error('❌ Erro ao buscar admins da tabela users:', adminError)
      return
    }
    
    console.log(`\n👥 Usuários admin na tabela users: ${adminUsers?.length || 0}`)
    
    if (adminUsers && adminUsers.length > 0) {
      adminUsers.forEach(user => {
        console.log(`\n📧 Email: ${user.email}`)
        console.log(`🔑 ID: ${user.id}`)
        console.log(`👑 Role: ${user.role}`)
        console.log(`📅 Criado: ${new Date(user.created_at).toLocaleString()}`)
      })
    }
    
    // Sugestão de reset se necessário
    if (!authUsers.users || authUsers.users.length === 0) {
      console.log('\n⚠️ NENHUM USUÁRIO ENCONTRADO!')
      console.log('💡 Execute o script create-admin.js para criar um usuário admin.')
    } else {
      console.log('\n💡 Para testar o login:')
      console.log('1. Acesse /admin/login')
      console.log('2. Use um dos emails listados acima')
      console.log('3. Se não souber a senha, execute reset-admin-password.js')
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

listAdminUsers()
