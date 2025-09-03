import { NextRequest } from 'next/server';

// Função para verificar autenticação via header
export function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  // Verifica se tem o token de autorização
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  
  // Verificação simples do token (em produção, use JWT)
  // Token = base64(username:timestamp)
  try {
    const decoded = atob(token);
    const [username, timestamp] = decoded.split(':');
    
    if (username !== 'waldenrique') {
      return false;
    }
    
    // Verifica se o token não expirou (24 horas)
    const now = Date.now();
    const tokenTime = parseInt(timestamp);
    const hoursInMs = 24 * 60 * 60 * 1000;
    
    if (now - tokenTime > hoursInMs) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

// Gerar token de autenticação
export function generateAuthToken(username: string): string {
  const timestamp = Date.now().toString();
  const payload = `${username}:${timestamp}`;
  return btoa(payload);
}

// Middleware de resposta não autorizada
export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Acesso não autorizado' }), 
    { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
