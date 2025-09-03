// Utilitário para fazer requisições HTTP autenticadas

export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
}

// Hook para verificar se está autenticado
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const authStatus = localStorage.getItem('adminAuth');
  const loginTime = localStorage.getItem('loginTime');
  const token = localStorage.getItem('authToken');
  
  if (!authStatus || !loginTime || !token) {
    return false;
  }
  
  // Verificar expiração
  const now = Date.now();
  const tokenTime = parseInt(loginTime);
  const hoursInMs = 24 * 60 * 60 * 1000;
  
  return (now - tokenTime) <= hoursInMs;
}

// Função para logout
export function logout(): void {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('loginTime');
}
