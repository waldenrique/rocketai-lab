import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../lib/database.types'
import { readFileSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

// Carregar .env.local
config({ path: '.env.local' })

// Cliente Supabase admin para o script
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface LegacyPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  publishedAt: string
  updatedAt: string
  published: boolean
  category: string
  tags: string[]
  readingTime: number
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
  }
}

export async function migratePosts() {
  try {
    console.log('🚀 Iniciando migração dos posts...')
    
    // Ler posts do arquivo JSON
    const postsPath = join(process.cwd(), 'data', 'posts.json')
    const postsData = readFileSync(postsPath, 'utf-8')
    const legacyPosts: LegacyPost[] = JSON.parse(postsData)
    
    console.log(`📄 Encontrados ${legacyPosts.length} posts para migrar`)
    
    for (const legacyPost of legacyPosts) {
      console.log(`📝 Migrando: ${legacyPost.title}`)
      
      // Converter formato legado para Supabase
      const supabasePost = {
        id: randomUUID(), // Gerar UUID válido
        slug: legacyPost.slug,
        title: legacyPost.title,
        excerpt: legacyPost.excerpt,
        content: legacyPost.content,
        image: legacyPost.image || null,
        author: legacyPost.author,
        published_at: legacyPost.publishedAt,
        updated_at: legacyPost.updatedAt,
        published: legacyPost.published,
        category: legacyPost.category,
        tags: legacyPost.tags,
        reading_time: legacyPost.readingTime,
        seo_meta_title: legacyPost.seo.metaTitle || null,
        seo_meta_description: legacyPost.seo.metaDescription || null,
        seo_keywords: legacyPost.seo.keywords,
        seo_og_title: legacyPost.seo.ogTitle || null,
        seo_og_description: legacyPost.seo.ogDescription || null,
        seo_og_image: legacyPost.seo.ogImage || null,
        created_at: legacyPost.publishedAt
      }
      
      // Inserir no Supabase
      const { data, error } = await supabaseAdmin
        .from('posts')
        .upsert(supabasePost as any, { onConflict: 'slug' })
      
      if (error) {
        console.error(`❌ Erro ao migrar post ${legacyPost.title}:`, error)
      } else {
        console.log(`✅ Post migrado: ${legacyPost.title}`)
      }
    }
    
    console.log('🎉 Migração concluída!')
    return { success: true, migratedCount: legacyPosts.length }
    
  } catch (error) {
    console.error('❌ Erro na migração:', error)
    return { success: false, error }
  }
}

// Script para executar a migração
if (require.main === module) {
  migratePosts()
    .then((result) => {
      if (result.success) {
        console.log(`✅ Migração bem-sucedida! ${result.migratedCount} posts migrados.`)
      } else {
        console.error('❌ Migração falhou:', result.error)
      }
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error('❌ Erro inesperado:', error)
      process.exit(1)
    })
}
