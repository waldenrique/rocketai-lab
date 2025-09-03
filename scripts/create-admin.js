// Script para criar usuário admin no Supabase de forma segura
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

async function createAdminUser() {
  console.log('🔐 Criando usuário admin seguro no Supabase...\n')
  
  try {
    // 1. Criar usuário de autenticação no Supabase
    const adminEmail = 'admin@rocketai-lab.com'
    const temporaryPassword = 'TempAdmin2025!' // Senha temporária que deve ser alterada
    
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'Admin RocketAI Lab'
      }
    })
    
    if (authError) {
      if (authError.code === 'email_exists' || authError.message.includes('already exists')) {
        console.log('⚠️ Usuário já existe. Buscando usuário existente...')
        
        const { data: existingUsers } = await supabase.auth.admin.listUsers()
        const existingUser = existingUsers.users.find(u => u.email === adminEmail)
        
        if (existingUser) {
          console.log('✅ Usuário admin encontrado:')
          console.log(`  📧 Email: ${existingUser.email}`)
          console.log(`  🔑 ID: ${existingUser.id}`)
          console.log(`  📅 Criado: ${existingUser.created_at}`)
          
          // Verificar se existe na tabela users
          const { data: userRecord } = await supabase
            .from('users')
            .select('*')
            .eq('id', existingUser.id)
            .single()
          
          if (!userRecord) {
            console.log('➕ Adicionando entrada na tabela users...')
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: existingUser.id,
                email: existingUser.email,
                role: 'admin'
              })
              
            if (insertError) {
              console.error('❌ Erro ao inserir na tabela users:', insertError)
            } else {
              console.log('✅ Entrada na tabela users criada!')
            }
          } else {
            console.log('✅ Entrada na tabela users já existe!')
          }
          
          console.log('\n🎉 USUÁRIO ADMIN CONFIGURADO!')
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
          console.log(`📧 Email: ${adminEmail}`)
          console.log(`🔒 Senha atual: TempAdmin2025!`)
          console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!')
          console.log('🌐 URL Admin: /admin')
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
          
          return
        }
      } else {
        console.error('❌ Erro ao criar usuário:', authError)
        return
      }
    }
    
    console.log('✅ Usuário de autenticação criado com sucesso!')
    console.log(`  📧 Email: ${authUser.user.email}`)
    console.log(`  🔑 ID: ${authUser.user.id}`)
    
    // 2. Adicionar entrada na tabela users
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email: authUser.user.email,
        role: 'admin'
      })
    
    if (userError) {
      console.error('❌ Erro ao criar entrada na tabela users:', userError)
      return
    }
    
    console.log('✅ Entrada na tabela users criada!')
    
    console.log('\n🎉 USUÁRIO ADMIN CRIADO COM SUCESSO!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Email: ${adminEmail}`)
    console.log(`🔒 Senha temporária: ${temporaryPassword}`)
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!')
    console.log('🌐 URL Admin: /admin')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

createAdminUser()
