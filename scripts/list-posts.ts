import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Carregar .env.local
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function listPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Erro:', error)
    return
  }
  
  console.log('📝 Posts no banco:')
  data.forEach(post => {
    console.log(`- Título: ${post.title}`)
    console.log(`  Slug: ${post.slug}`)
    console.log(`  ID: ${post.id}`)
    console.log('')
  })
}

listPosts()
