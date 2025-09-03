"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, ArrowLeft, Plus, Edit, Trash2, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost, CreatePostData } from '@/lib/blog.types';
import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      ogTitle: '',
      ogDescription: '',
      ogImage: ''
    }
  });

  useEffect(() => {
    loadPosts();
    // Buscar usuário logado
    const user = localStorage.getItem('adminUser');
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    router.push('/');
  };

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingPost ? 'Post atualizado!' : 'Post criado!');
        resetForm();
        loadPosts();
      } else {
        alert('Erro ao salvar post');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post excluído!');
        loadPosts();
      } else {
        alert('Erro ao excluir post');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao excluir post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        ogTitle: '',
        ogDescription: '',
        ogImage: ''
      }
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const startEditing = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      seo: post.seo
    });
    setEditingPost(post);
    setIsCreating(true);
  };

  if (isCreating || editingPost) {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <ArrowLeft className="size-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-3xl font-bold text-white">
                {editingPost ? 'Editar Post' : 'Criar Novo Post'}
              </h1>
              
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="size-4" />
                  <span>{currentUser}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <LogOut className="size-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-white">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Título do Post
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Digite o título do post"
                    className="bg-slate-950 border-slate-800 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Resumo/Excerpt
                  </label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Breve descrição do post (aparece na listagem)"
                    className="bg-slate-950 border-slate-800 text-white min-h-20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Categoria
                    </label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Ex: Marketing Digital"
                      className="bg-slate-950 border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tags (separadas por vírgula)
                    </label>
                    <Input
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                      })}
                      placeholder="seo, marketing, automação"
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conteúdo */}
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-white">Conteúdo do Post</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Escreva o conteúdo completo do post aqui..."
                  className="bg-slate-950 border-slate-800 text-white min-h-96"
                  required
                />
                <p className="text-sm text-slate-400 mt-2">
                  Use quebras de linha para separar parágrafos. O texto será formatado automaticamente.
                </p>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-white">Configurações de SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Título (SEO)
                  </label>
                  <Input
                    value={formData.seo.metaTitle}
                    onChange={(e) => setFormData({
                      ...formData, 
                      seo: {...formData.seo, metaTitle: e.target.value}
                    })}
                    placeholder="Título otimizado para mecanismos de busca"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Deixe vazio para usar o título do post
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Descrição (SEO)
                  </label>
                  <Textarea
                    value={formData.seo.metaDescription}
                    onChange={(e) => setFormData({
                      ...formData, 
                      seo: {...formData.seo, metaDescription: e.target.value}
                    })}
                    placeholder="Descrição que aparece nos resultados de busca"
                    className="bg-slate-950 border-slate-800 text-white min-h-20"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Ideal: 150-160 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Palavras-chave (separadas por vírgula)
                  </label>
                  <Input
                    value={formData.seo.keywords.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData, 
                      seo: {
                        ...formData.seo, 
                        keywords: e.target.value.split(',').map(kw => kw.trim()).filter(Boolean)
                      }
                    })}
                    placeholder="marketing digital, seo, automação"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Save className="size-4 mr-2" />
                {loading ? 'Salvando...' : (editingPost ? 'Atualizar Post' : 'Criar Post')}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header com navegação e usuário */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="size-4" />
                Início
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Eye className="size-4" />
                Ver Blog
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="size-4" />
                <span>Olá, {currentUser}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <LogOut className="size-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Painel Administrativo
              </h1>
              <p className="text-slate-300">
                Gerencie os posts do seu blog
              </p>
            </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="size-4 mr-2" />
              Novo Post
            </Button>
            
            <Link href="/blog">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
                <Eye className="size-4 mr-2" />
                Ver Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum post criado ainda
                </h3>
                <p className="text-slate-300 mb-6">
                  Crie seu primeiro post para começar a compartilhar conteúdo.
                </p>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="size-4 mr-2" />
                  Criar Primeiro Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="border-slate-800/60 bg-slate-900/40">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span>{post.category}</span>
                        <span>{post.readingTime} min de leitura</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => startEditing(post)}
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        <Edit className="size-4" />
                      </Button>
                      
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                      
                      <Button
                        onClick={() => handleDelete(post.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600/20 hover:text-red-300"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
    </AuthWrapper>
  );
}
