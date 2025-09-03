import fs from 'fs';
import path from 'path';
import { BlogPost, CreatePostData } from './blog.types';

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json');

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplos
    .trim();
}

// Função para calcular tempo de leitura
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para gerar ID único
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Carregar todos os posts
export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(POSTS_FILE)) {
      return [];
    }
    const fileContents = fs.readFileSync(POSTS_FILE, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    return [];
  }
}

// Carregar posts publicados
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts()
    .filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Buscar post por slug
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Salvar posts
function savePosts(posts: BlogPost[]): void {
  const dir = path.dirname(POSTS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

// Criar novo post
export function createPost(data: CreatePostData): BlogPost {
  const posts = getAllPosts();
  const id = generateId();
  const slug = generateSlug(data.title);
  const now = new Date().toISOString();
  
  const newPost: BlogPost = {
    id,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    image: data.image || '',
    author: 'Rocket Lab Marketing',
    publishedAt: now,
    updatedAt: now,
    published: true,
    category: data.category,
    tags: data.tags,
    readingTime: calculateReadingTime(data.content),
    seo: data.seo
  };
  
  posts.push(newPost);
  savePosts(posts);
  
  return newPost;
}

// Atualizar post
export function updatePost(id: string, data: Partial<CreatePostData>): BlogPost | null {
  const posts = getAllPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return null;
  }
  
  const existingPost = posts[postIndex];
  const updatedPost: BlogPost = {
    ...existingPost,
    ...data,
    updatedAt: new Date().toISOString(),
    readingTime: data.content ? calculateReadingTime(data.content) : existingPost.readingTime,
    slug: data.title ? generateSlug(data.title) : existingPost.slug
  };
  
  posts[postIndex] = updatedPost;
  savePosts(posts);
  
  return updatedPost;
}

// Deletar post
export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return false; // Post não encontrado
  }
  
  savePosts(filteredPosts);
  return true;
}
