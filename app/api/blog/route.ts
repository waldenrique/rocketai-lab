/**
 * BLOG API MAIN ENDPOINT
 * Status: ✅ FUNCIONANDO (Fase 1 concluída)
 * 
 * GET /api/blog - Lista todos os posts publicados do Supabase
 * POST /api/blog - Cria novo post (requer autenticação)
 * 
 * Integração: Supabase posts table
 * Última atualização: 03/09/2025
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts, createPost } from '@/lib/blog.utils';
import { CreatePostData } from '@/lib/blog.types';
import { checkAuth, unauthorizedResponse } from '@/lib/auth.utils';

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Verificar autenticação para operações de escrita
  if (!checkAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const data: CreatePostData = await request.json();
    
    // Validação básica
    if (!data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: 'Título, conteúdo e resumo são obrigatórios' },
        { status: 400 }
      );
    }

    const newPost = createPost(data);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
