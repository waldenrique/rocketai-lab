/**
 * Script para verificar e criar usuário admin no Supabase
 */
import * as dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' })

console.log('🔧 Verificando variáveis de ambiente...')
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Definido' : 'Não definido')
console.log('SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Definido' : 'Não definido')

import { supabaseAdmin } from '../lib/supabase'

async function checkAdminUser() {
  console.log('🔍 Verificando usuário admin no Supabase...\n')
  
  try {
    // Verificar se existe algum usuário admin na tabela users
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('role', 'admin')
    
    if (usersError) {
      console.error('❌ Erro ao buscar usuários:', usersError)
      return
    }
    
    console.log('👥 Usuários admin encontrados:', users?.length || 0)
    if (users && users.length > 0) {
      users.forEach((user: any) => {
        console.log(`  📧 Email: ${user.email}`)
        console.log(`  🔑 ID: ${user.id}`)
        console.log(`  📅 Criado em: ${user.created_at}`)
        console.log('')
      })
    }
    
    // Verificar usuários de auth do Supabase
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (authError) {
      console.error('❌ Erro ao buscar usuários de auth:', authError)
      return
    }
    
    console.log('🔐 Usuários de autenticação encontrados:', authUsers.users?.length || 0)
    if (authUsers.users && authUsers.users.length > 0) {
      authUsers.users.forEach(user => {
        console.log(`  📧 Email: ${user.email}`)
        console.log(`  🔑 ID: ${user.id}`)
        console.log(`  📅 Criado em: ${user.created_at}`)
        console.log(`  ✅ Confirmado: ${user.email_confirmed_at ? 'Sim' : 'Não'}`)
        console.log('')
      })
    }
    
    // Credenciais atuais (para referência)
    console.log('🔑 Credenciais admin atuais (config.ts):')
    console.log(`  👤 Username: waldenrique`)
    console.log(`  🔒 Password: rocketai85`)
    console.log('')
    
    if (!users || users.length === 0) {
      console.log('⚠️ NENHUM USUÁRIO ADMIN ENCONTRADO!')
      console.log('💡 Para criar um usuário admin, você precisa:')
      console.log('   1. Criar uma conta no Supabase Auth')
      console.log('   2. Adicionar uma entrada na tabela users com role="admin"')
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

checkAdminUser()
