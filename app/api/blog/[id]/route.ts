import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, updatePost, deletePost, getAllPosts } from '@/lib/blog.utils';
import { CreatePostData } from '@/lib/blog.types';
import { checkAuth, unauthorizedResponse } from '@/lib/auth.utils';

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    
    // Se for um slug, buscar por slug
    const post = getPostBySlug(id);
    
    if (!post) {
      // Se não encontrou por slug, tentar buscar por ID
      const allPosts = getAllPosts();
      const postById = allPosts.find(p => p.id === id);
      
      if (!postById) {
        return NextResponse.json(
          { error: 'Post não encontrado' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(postById);
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verificar autenticação
  if (!checkAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = params;
    const data: Partial<CreatePostData> = await request.json();
    
    const updatedPost = updatePost(id, data);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  // Verificar autenticação
  if (!checkAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = params;
    
    const success = deletePost(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
