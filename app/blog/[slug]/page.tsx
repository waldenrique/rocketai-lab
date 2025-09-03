"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog.types';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost(slug as string);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                href="/" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                ← Início
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                ← Blog
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
