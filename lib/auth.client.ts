import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

// Cliente para uso no browser (client-side)
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Funções de autenticação seguras
export const auth = {
  // Login com email e senha
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Verificar se é admin
  async isAdmin() {
    console.log('🔍 Verificando se é admin...');
    
    const { user } = await this.getCurrentUser()
    console.log('👤 Usuário atual:', user?.id, user?.email);
    
    if (!user) {
      console.log('❌ Nenhum usuário logado');
      return false;
    }
    
    // Verificar role nos metadados do usuário (mais seguro e direto)
    const role = user.user_metadata?.role;
    console.log('👑 Role nos metadados:', role);
    
    const isAdminUser = role === 'admin';
    console.log('✅ É admin?', isAdminUser);
    
    return isAdminUser;
  },

  // Alterar senha
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { data, error }
  },

  // Listener para mudanças de autenticação
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Função legada para compatibilidade (será removida)
export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('Não autenticado')
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`,
    ...options.headers,
  }
  
  return fetch(url, {
    ...options,
    headers,
  })
}

// Função para logout (compatibilidade)
export function logout(): void {
  auth.signOut()
}

export default supabase
