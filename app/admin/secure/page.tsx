"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, ArrowLeft, Plus, Edit, Trash2, LogOut, User, Settings, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost, CreatePostData } from '@/lib/blog.types';
import { auth } from '@/lib/auth.client';
import Link from 'next/link';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
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
    checkAuth();
    loadPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const { user } = await auth.getCurrentUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }

      const isAdmin = await auth.isAdmin();
      if (!isAdmin) {
        router.push('/admin/login');
        return;
      }

      setCurrentUser(user);
    } catch (error) {
      console.error('Erro na verificação de auth:', error);
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres!');
      return;
    }

    try {
      const { error } = await auth.updatePassword(passwordData.newPassword);
      if (error) {
        alert('Erro ao alterar senha: ' + error.message);
        return;
      }

      alert('Senha alterada com sucesso!');
      setShowPasswordChange(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Erro interno ao alterar senha');
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  // Resto das funções do admin (createPost, updatePost, deletePost etc.)
  const createPost = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        loadPosts();
        resetForm();
      } else {
        alert('Erro ao criar post');
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post');
    }
    setLoading(false);
  };

  const updatePost = async () => {
    if (!editingPost) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${editingPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        loadPosts();
        resetForm();
      } else {
        alert('Erro ao atualizar post');
      }
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      alert('Erro ao atualizar post');
    }
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadPosts();
      } else {
        alert('Erro ao excluir post');
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error);
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Blog Management</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-4 h-4" />
              <span>{currentUser.email}</span>
            </div>
            
            <Button
              onClick={() => setShowPasswordChange(true)}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Key className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
            
            <Link href="/">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Modal de Alteração de Senha */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Alterar Senha</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nova Senha</label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Confirmar Senha</label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => setShowPasswordChange(false)}
                variant="outline"
                className="border-gray-600"
              >
                Cancelar
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={!passwordData.newPassword || !passwordData.confirmPassword}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Alterar Senha
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {!isCreating ? (
          // Lista de Posts
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Posts do Blog</h2>
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Post
              </Button>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-gray-400 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Categoria: {post.category}</span>
                          <span>Publicado: {post.published ? 'Sim' : 'Não'}</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => startEditing(post)}
                          size="sm"
                          variant="outline"
                          className="border-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deletePost(post.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Editor de Post
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingPost ? 'Editar Post' : 'Novo Post'}
              </h2>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-gray-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Título do post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resumo</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Resumo do post"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Conteúdo</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Conteúdo completo do post (Markdown suportado)"
                    rows={15}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Categoria do post"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-gray-600"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={editingPost ? updatePost : createPost}
                    disabled={loading || !formData.title || !formData.content}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Salvando...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingPost ? 'Atualizar' : 'Criar'} Post
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
