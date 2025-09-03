/**
 * BLOG UTILITIES - SUPABASE INTEGRATION
 * Status: ✅ FUNCIONANDO (Fase 1 concluída)
 * 
 * Funções para gerenciar posts do blog usando Supabase
 * - Todas as funções são assíncronas
 * - Integração completa com banco PostgreSQL
 * - Suporte a CRUD completo (Create, Read, Update, Delete)
 * 
 * Posts migrados: 3 posts funcionais
 * APIs conectadas: /api/blog funcionando 100%
 */

import { supabaseAdmin } from './supabase'
import { BlogPost, CreatePostData } from './blog.types'
import { randomUUID } from 'crypto'

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplos
    .trim()
}

// Função para calcular tempo de leitura
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Buscar posts publicados do Supabase
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar posts:', error)
      return []
    }

    // Converter formato do banco para o formato da aplicação
    return data.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      published: post.published,
      category: post.category,
      tags: post.tags,
      readingTime: post.reading_time,
      seo: {
        metaTitle: post.seo_meta_title,
        metaDescription: post.seo_meta_description,
        keywords: post.seo_keywords,
        ogTitle: post.seo_og_title,
        ogDescription: post.seo_og_description,
        ogImage: post.seo_og_image
      }
    }))
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return []
  }
}

// Buscar post por slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      published: data.published,
      category: data.category,
      tags: data.tags,
      readingTime: data.reading_time,
      seo: {
        metaTitle: data.seo_meta_title,
        metaDescription: data.seo_meta_description,
        keywords: data.seo_keywords,
        ogTitle: data.seo_og_title,
        ogDescription: data.seo_og_description,
        ogImage: data.seo_og_image
      }
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    return null
  }
}

// Criar novo post
export async function createPost(postData: CreatePostData): Promise<BlogPost | null> {
  try {
    const slug = generateSlug(postData.title)
    const readingTime = calculateReadingTime(postData.content)
    
    const newPost = {
      id: randomUUID(),
      slug,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      image: postData.image,
      author: 'Rocket Lab Marketing',
      published: true,
      category: postData.category,
      tags: postData.tags || [],
      reading_time: readingTime,
      seo_meta_title: postData.seo?.metaTitle,
      seo_meta_description: postData.seo?.metaDescription,
      seo_keywords: postData.seo?.keywords || [],
      seo_og_title: postData.seo?.ogTitle,
      seo_og_description: postData.seo?.ogDescription,
      seo_og_image: postData.seo?.ogImage
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert(newPost)
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar post:', error)
      return null
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      published: data.published,
      category: data.category,
      tags: data.tags,
      readingTime: data.reading_time,
      seo: {
        metaTitle: data.seo_meta_title,
        metaDescription: data.seo_meta_description,
        keywords: data.seo_keywords,
        ogTitle: data.seo_og_title,
        ogDescription: data.seo_og_description,
        ogImage: data.seo_og_image
      }
    }
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return null
  }
}

// Buscar todos os posts (incluindo não publicados) - para admin
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar todos os posts:', error)
      return []
    }

    return data.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      published: post.published,
      category: post.category,
      tags: post.tags,
      readingTime: post.reading_time,
      seo: {
        metaTitle: post.seo_meta_title,
        metaDescription: post.seo_meta_description,
        keywords: post.seo_keywords,
        ogTitle: post.seo_og_title,
        ogDescription: post.seo_og_description,
        ogImage: post.seo_og_image
      }
    }))
  } catch (error) {
    console.error('Erro ao buscar todos os posts:', error)
    return []
  }
}

// Atualizar post existente
export async function updatePost(id: string, postData: Partial<CreatePostData>): Promise<BlogPost | null> {
  try {
    const updateData: any = {}
    
    if (postData.title) {
      updateData.title = postData.title
      updateData.slug = generateSlug(postData.title)
    }
    if (postData.excerpt) updateData.excerpt = postData.excerpt
    if (postData.content) {
      updateData.content = postData.content
      updateData.reading_time = calculateReadingTime(postData.content)
    }
    if (postData.image) updateData.image = postData.image
    if (postData.category) updateData.category = postData.category
    if (postData.tags) updateData.tags = postData.tags
    if (postData.seo) {
      updateData.seo_meta_title = postData.seo.metaTitle
      updateData.seo_meta_description = postData.seo.metaDescription
      updateData.seo_keywords = postData.seo.keywords
      updateData.seo_og_title = postData.seo.ogTitle
      updateData.seo_og_description = postData.seo.ogDescription
      updateData.seo_og_image = postData.seo.ogImage
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      console.error('Erro ao atualizar post:', error)
      return null
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      published: data.published,
      category: data.category,
      tags: data.tags,
      readingTime: data.reading_time,
      seo: {
        metaTitle: data.seo_meta_title,
        metaDescription: data.seo_meta_description,
        keywords: data.seo_keywords,
        ogTitle: data.seo_og_title,
        ogDescription: data.seo_og_description,
        ogImage: data.seo_og_image
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar post:', error)
    return null
  }
}

// Deletar post
export async function deletePost(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao deletar post:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar post:', error)
    return false
  }
}
