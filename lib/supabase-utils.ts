import { supabase, supabaseAdmin } from './supabase'
import { Database } from './database.types'

type Post = Database['public']['Tables']['posts']['Row']
type NewPost = Database['public']['Tables']['posts']['Insert']
type UpdatePost = Database['public']['Tables']['posts']['Update']

type Product = Database['public']['Tables']['products']['Row']
type NewProduct = Database['public']['Tables']['products']['Insert']

type Order = Database['public']['Tables']['orders']['Row']
type NewOrder = Database['public']['Tables']['orders']['Insert']

// ========== POSTS ==========

export async function getAllPosts(includeUnpublished = false): Promise<Post[]> {
  let query = supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (!includeUnpublished) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao buscar posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Erro ao buscar post:', error)
    return null
  }

  return data
}

export async function createPost(post: NewPost): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar post:', error)
    return null
  }

  return data
}

export async function updatePost(id: string, updates: UpdatePost): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar post:', error)
    return null
  }

  return data
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar post:', error)
    return false
  }

  return true
}

// ========== PRODUCTS ==========

export async function getAllProducts(activeOnly = true): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (activeOnly) {
    query = query.eq('active', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }

  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('active', true)
    .single()

  if (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }

  return data
}

export async function createProduct(product: NewProduct): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar produto:', error)
    return null
  }

  return data
}

// ========== ORDERS ==========

export async function createOrder(order: NewOrder): Promise<Order | null> {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar pedido:', error)
    return null
  }

  return data
}

export async function getOrderByStripeSession(sessionId: string): Promise<Order | null> {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('stripe_session_id', sessionId)
    .single()

  if (error) {
    console.error('Erro ao buscar pedido:', error)
    return null
  }

  return data
}

export async function updateOrderStatus(
  sessionId: string, 
  status: 'completed' | 'failed' | 'refunded',
  paymentIntentId?: string
): Promise<Order | null> {
  const updates: any = { status }
  if (paymentIntentId) {
    updates.stripe_payment_intent_id = paymentIntentId
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('stripe_session_id', sessionId)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar status do pedido:', error)
    return null
  }

  return data
}

export async function getCustomerOrders(email: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      products (
        name,
        description,
        type
      )
    `)
    .eq('customer_email', email)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar pedidos do cliente:', error)
    return []
  }

  return data || []
}

// ========== UTILITIES ==========

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

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
