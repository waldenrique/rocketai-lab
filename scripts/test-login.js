// Script para testar login diretamente
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

async function testLogin() {
  console.log('🧪 Testando login direto com Supabase...\n')
  
  const credentials = [
    { email: 'waldenriquept@gmail.com', password: 'rocketai85' },
    { email: 'admin@rocketai-lab.com', password: 'TempAdmin2025!' }
  ]
  
  for (const cred of credentials) {
    console.log(`\n🔐 Testando: ${cred.email}`)
    console.log(`🔒 Senha: ${cred.password}`)
    
    try {
      // Criar cliente temporário para teste de login
      const testClient = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
      
      const { data, error } = await testClient.auth.signInWithPassword({
        email: cred.email,
        password: cred.password
      })
      
      if (error) {
        console.log(`❌ Erro: ${error.message}`)
        continue
      }
      
      if (data.user) {
        console.log(`✅ Login bem-sucedido!`)
        console.log(`   📧 User ID: ${data.user.id}`)
        console.log(`   📧 Email: ${data.user.email}`)
        
        // Verificar role
        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()
        
        if (userData) {
          console.log(`   👑 Role: ${userData.role}`)
        }
        
        // Fazer logout do teste
        await testClient.auth.signOut()
      }
      
    } catch (err) {
      console.log(`❌ Erro de conexão: ${err.message}`)
    }
  }
  
  console.log('\n🌐 URLs para testar:')
  console.log('📱 Blog: http://localhost:3001/blog')
  console.log('🔐 Admin Login: http://localhost:3001/admin/login')
  console.log('⚙️ Admin Panel: http://localhost:3001/admin/secure')
}

testLogin()
