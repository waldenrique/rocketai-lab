import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../lib/database.types'

// Carregar .env.local
config({ path: '.env.local' })

console.log('🔍 Verificando variáveis de ambiente...')
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurada' : '❌ Não encontrada')
console.log('SUPABASE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configurada' : '❌ Não encontrada')

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com Supabase...')
    
    // Verificar se as tabelas existem
    const { data: tables, error } = await supabase
      .from('posts')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Erro ao conectar:', error.message)
      console.log('\n📋 VOCÊ PRECISA EXECUTAR O SCHEMA SQL NO SUPABASE:')
      console.log('1. Vá para https://supabase.com/dashboard')
      console.log('2. Abra seu projeto')
      console.log('3. Vá em "SQL Editor"')
      console.log('4. Cole o conteúdo do arquivo supabase-schema.sql')
      console.log('5. Execute o script')
      return false
    }
    
    console.log('✅ Conexão com Supabase funcionando!')
    console.log('✅ Tabelas do banco criadas!')
    return true
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error)
    return false
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n🚀 Pronto para migrar os posts!')
  }
  process.exit(success ? 0 : 1)
})
