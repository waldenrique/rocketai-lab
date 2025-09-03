/**
 * INDIVIDUAL BLOG POST PAGE
 * Status: ✅ FUNCIONANDO (Fase 1 concluída)
 * 
 * Funcionalidades:
 * - Exibe post completo por slug
 * - Navegação anterior/próximo
 * - SEO otimizado
 * - Design responsivo
 * 
 * URLs funcionais:
 * - /blog/por-que-sua-empresa-precisa-de-presenca-digital-em-2025
 * - /blog/automacao-de-marketing-como-acelerar-vendas
 * - /blog/redes-sociais-estrategias-que-geram-resultados
 * 
 * Última atualização: 03/09/2025
 */

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog.types';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string);
      fetchAllPosts();
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      const response = await fetch(`/api/blog/${postSlug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Encontrar posts anterior e próximo
  const getCurrentPostIndex = () => {
    return allPosts.findIndex(p => p.slug === slug);
  };

  const getPreviousPost = () => {
    const currentIndex = getCurrentPostIndex();
    return currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  };

  const getNextPost = () => {
    const currentIndex = getCurrentPostIndex();
    return currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  };

  const previousPost = getPreviousPost();
  const nextPost = getNextPost();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-slate-300">Carregando post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Post não encontrado
          </h1>
          <p className="text-slate-300 mb-8">
            O post que você está procurando não existe ou foi removido.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar ao blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/60">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
              >
                <ArrowLeft className="size-4" />
                Voltar ao Blog
              </Link>
              <span className="text-slate-600">|</span>
              <Link 
                href="/" 
                className="text-slate-400 hover:text-white transition-colors"
              >
                Início
              </Link>
            </div>
            
            <Link 
              href="/login" 
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Post Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readingTime} min de leitura
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="size-4" />
                  {post.category}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-6 md:text-5xl">
                {post.title}
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800/60 text-slate-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {post.image && (
                <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </header>

            {/* Post Body */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-slate-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Autor</p>
                  <p className="text-white font-semibold">{post.author}</p>
                </div>
                
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copiado para a área de transferência!');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Share2 className="size-4" />
                  Compartilhar
                </button>
              </div>
            </footer>
          </motion.div>
        </div>
      </article>

      {/* Navigation between posts */}
      {(previousPost || nextPost) && (
        <section className="border-t border-slate-800/60 py-12">
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Post Anterior */}
              <div className="flex justify-start">
                {previousPost ? (
                  <Link 
                    href={`/blog/${previousPost.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900/60 transition-all max-w-sm"
                  >
                    <div className="flex-shrink-0">
                      <ChevronLeft className="size-6 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-400 mb-1">Post anterior</p>
                      <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {previousPost.title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Próximo Post */}
              <div className="flex justify-end">
                {nextPost ? (
                  <Link 
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900/60 transition-all max-w-sm"
                  >
                    <div className="min-w-0 text-right">
                      <p className="text-sm text-slate-400 mb-1">Próximo post</p>
                      <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {nextPost.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRight className="size-6 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog Button */}
      <section className="border-t border-slate-800/60 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Ver todos os posts
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gostou do conteúdo?
          </h2>
          <p className="text-slate-300 mb-8">
            Entre em contato conosco e descubra como podemos acelerar seu crescimento digital.
          </p>
          <Link 
            href="/#contato" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-2xl hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300"
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </div>
  );
}
